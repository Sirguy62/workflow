import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Navigation from "@/components/Navigation";

export default async function ProtectedLayout({ children }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 🔴 NOT LOGGED IN → SEND TO AUTH
  if (!session) {
    redirect("/auth");
  }

  return (
    <>
      <Navigation session={session} />
      {children}
    </>
  );
}
