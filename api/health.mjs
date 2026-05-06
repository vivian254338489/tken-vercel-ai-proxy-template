import { getConfig } from "../lib/gateway.mjs";

export default function handler(_req, res) {
  const config = getConfig();
  res.status(200).json({
    ok: true,
    service: "tken-vercel-ai-proxy-template",
    upstreamBaseUrl: config.upstreamBaseUrl,
    routes: Object.keys(config.routes),
  });
}
