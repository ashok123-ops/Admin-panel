import {createHash,randomBytes} from "node:crypto";
export function hashKey(key:string) {
  const secret=process.env.LICENSE_HASH_SECRET;
  if(!secret || secret.length<32) throw new Error("Set LICENSE_HASH_SECRET to at least 32 characters.");
  return createHash("sha256").update(`${secret}:${key.trim().toUpperCase()}`).digest("hex");
}
export function newKey() {
  return "OG-"+Array.from({length:4},()=>randomBytes(3).toString("hex").toUpperCase()).join("-");
}
