export function getConfig() {
  return {
    upstreamBaseUrl: process.env.UPSTREAM_BASE_URL || "https://www.tken.shop/v1",
    upstreamApiKey: process.env.UPSTREAM_API_KEY || "",
    localApiKey: process.env.LOCAL_API_KEY || "local-dev-key",
    routes: {
      "free-model": process.env.FREE_MODEL || "tken-free-model",
      "premium-gpt": process.env.PREMIUM_MODEL || "premium-gpt-model",
    },
  };
}

export function publicModels() {
  const { routes } = getConfig();
  return Object.keys(routes).map((id) => ({ id, object: "model", owned_by: "tken-vercel-ai-proxy" }));
}

export async function chatCompletion(req, res) {
  const config = getConfig();
  if (config.localApiKey && req.headers.authorization !== `Bearer ${config.localApiKey}`) {
    return res.status(401).json({ error: { message: "Unauthorized. Use Authorization: Bearer LOCAL_API_KEY." } });
  }

  const body = { ...(req.body || {}) };
  const requestedModel = body.model || "free-model";
  body.model = config.routes[requestedModel] || requestedModel;

  if (!config.upstreamApiKey || config.upstreamApiKey === "your_tken_api_key") {
    return res.json({
      id: `chatcmpl-demo-${Date.now()}`,
      object: "chat.completion",
      created: Math.floor(Date.now() / 1000),
      model: requestedModel,
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: `Vercel AI proxy demo is working. Route: ${requestedModel}.` },
          finish_reason: "stop",
        },
      ],
    });
  }

  try {
    const upstream = await fetch(`${config.upstreamBaseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.upstreamApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    res.status(upstream.status);
    res.setHeader("Content-Type", upstream.headers.get("content-type") || "application/json");
    return res.send(await upstream.text());
  } catch (error) {
    return res.status(502).json({ error: { message: error.message, type: "upstream_error" } });
  }
}
