import crypto from "crypto";

export const getHash = (content) =>
  crypto.createHash("sha256").update(content).digest("hex");
