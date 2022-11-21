import sqlite3, { Database } from "better-sqlite3";

const db: Database = sqlite3("./data/db.sqlite");

// Create the users table.
try {
  db.exec(`CREATE TABLE users (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );`);
} catch { /**/ }

export default db;
// export * as users from "./users";