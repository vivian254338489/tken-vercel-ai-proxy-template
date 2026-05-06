# TKEN Vercel AI Proxy Template

Vercel-first OpenAI-compatible AI proxy for low-cost and premium model routes.

Default API base:

```text
https://www.tken.shop/v1
```

Get an API key:

```text
https://www.tken.shop/?utm_source=github&utm_medium=readme&utm_campaign=tken_vercel_ai_proxy_template
```

## Vercel Setup

1. Import this repository into Vercel.
2. Add environment variables from `.env.example`.
3. Deploy.
4. Test `/health`, `/v1/models`, and `/v1/chat/completions`.

## Routes

| Public path | Function |
| --- | --- |
| `/health` | `api/health.mjs` |
| `/v1/models` | `api/models.mjs` |
| `/v1/chat/completions` | `api/chat-completions.mjs` |

## Local Check

```bash
npm install
npm run check
npm run local
```

Local test:

```bash
curl http://localhost:8793/v1/chat/completions \
  -H "Authorization: Bearer local-dev-key" \
  -H "Content-Type: application/json" \
  -d "{\"model\":\"free-model\",\"messages\":[{\"role\":\"user\",\"content\":\"Say hello\"}]}"
```

## Disclosure

This template is TKEN-related tooling. It is not affiliated with Vercel, OpenAI, Anthropic, ChatGPT, Claude, Codex, or OpenClaw.
