import crypto from "crypto";
import fs from "fs";

function getKey() {
  if (fs.existsSync("./data/key.bin")) {
    return fs.readFileSync("./data/key.bin");
  } else {
    const key = crypto.randomBytes(256);
    fs.writeFileSync("./data/key.bin", key);
    return key;
  }
}

function getPepper() {
  if (fs.existsSync("./data/pepper.bin")) {
    return fs.readFileSync("./data/pepper.bin");
  } else {
    const pepper = crypto.randomBytes(32);
    fs.writeFileSync("./data/pepper.bin", pepper);
    return pepper;
  }
}

export default {
  /** The jwt signing key. */
  key: getKey(),

  /** The argon2id hash secret. */
  pepper: getPepper()
};
