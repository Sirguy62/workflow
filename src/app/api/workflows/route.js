import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json([]);
  }

  const workflows = await prisma.workflow.findMany({
    where: { ownerId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(workflows);
}

export async function POST(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, description } = await req.json();

    console.log("SESSION USER ID:", session.user.id);
    console.log("WORKFLOW MODEL:", prisma.workflow);


    const workflow = await prisma.workflow.create({
      data: {
        name,
        description,
        ownerId: session.user.id,
        stages: {
          create: [
            { name: "Backlog", order: 1 },
            { name: "In Progress", order: 2 },
            { name: "Review", order: 3 },
            { name: "Done", order: 4 },
          ],
        },
      },
    });

    revalidatePath("/workflows");

    return NextResponse.json(workflow, { status: 201 });
  } catch (err) {
    console.error("CREATE WORKFLOW ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
