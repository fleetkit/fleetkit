import db from ".";
import * as utils from "../utils";
import type { User } from "../types";

export async function create(email: string, password: string): Promise<User | null> {
  // Generate a unique id for the new user.
  const id = utils.uuid();

  // Hash their password.
  const hash = await utils.password.hash(password);

  // Attempt to create the user.
  try {
    db.prepare("INSERT INTO users (id, email, password) VALUES (?, ?, ?)").run(
      id,
      email,
      hash
    );
  } catch {
    return null;
  }

  // Return the new user object.
  return { id, email, password: hash };
}

export function getByEmail(email: string): User | null {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) ?? null;
}