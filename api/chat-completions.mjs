import { chatCompletion } from "../lib/gateway.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: { message: "Method not allowed." } });
  return chatCompletion(req, res);
}
