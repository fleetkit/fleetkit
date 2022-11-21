import crypto from "crypto";

/** Generates a new uuid. */
export default function uuid() {
  return crypto.randomBytes(12).toString('base64');
}