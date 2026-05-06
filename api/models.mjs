import { publicModels } from "../lib/gateway.mjs";

export default function handler(_req, res) {
  res.status(200).json({ object: "list", data: publicModels() });
}
