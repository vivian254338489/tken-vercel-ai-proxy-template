import fs from "node:fs";

const required = [
  "README.md",
  "LICENSE",
  "PROMOTION.md",
  ".env.example",
  "vercel.json",
  "package.json",
  "lib/gateway.mjs",
  "api/health.mjs",
  "api/models.mjs",
  "api/chat-completions.mjs",
  "local-dev.mjs",
  ".github/workflows/check.yml",
];

const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error(`Missing files: ${missing.join(", ")}`);
  process.exit(1);
}

JSON.parse(fs.readFileSync("vercel.json", "utf8"));
console.log(JSON.stringify({ ok: true, checked: required.length }, null, 2));
