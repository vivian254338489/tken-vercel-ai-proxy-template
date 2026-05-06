import "dotenv/config";
import express from "express";
import health from "./api/health.mjs";
import models from "./api/models.mjs";
import chat from "./api/chat-completions.mjs";

const app = express();
const port = Number.parseInt(process.env.PORT || "8793", 10);

app.use(express.json({ limit: "2mb" }));
app.get("/health", health);
app.get("/v1/models", models);
app.post("/v1/chat/completions", chat);

app.listen(port, () => console.log(`Vercel AI proxy local dev listening on http://127.0.0.1:${port}`));
