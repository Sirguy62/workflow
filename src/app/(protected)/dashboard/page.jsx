import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });


  if (!session) {
    redirect("/auth");
  }

  return <DashboardClient user={session?.user} />;
}
