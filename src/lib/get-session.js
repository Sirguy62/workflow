import { cookies, headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getSession() {
  const cookieStore = cookies();
  const headerStore = headers();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return auth.api.getSession({
    headers: new Headers({
      cookie: cookieHeader,
      ...Object.fromEntries(headerStore.entries()),
    }),
  });
}
