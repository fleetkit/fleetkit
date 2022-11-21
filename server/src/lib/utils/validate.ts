import type { z } from "zod";

/** Validates that the input data matches the input schema. */
export default async function validate<T extends z.Schema>(schema: T, data: unknown): Promise<z.infer<T> | null> {
  const parse = schema.safeParse(await Promise.resolve(data));
  if (!parse.success) return null;
  return parse.data;
}