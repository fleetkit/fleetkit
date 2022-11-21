import * as utils from ".";
import argon2 from "argon2";

/** Securely hashes the input password. */
export async function hash(password: string) {
  return await argon2.hash(password, {
    type: argon2.argon2id,
    secret: utils.secret.pepper
  });
}

/** Verifies that the input password matches the hash. */
export function verify(password: string, hash: string) {
  return argon2.verify(
    hash,
    password,
    {
      type: argon2.argon2id,
      secret: utils.secret.pepper,
    }
  );
}