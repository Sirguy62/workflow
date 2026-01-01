import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  const workflows = await prisma.workflow.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(workflows);
}

export async function POST(req) {
  const { name, description } = await req.json();

  const workflow = await prisma.workflow.create({
    data: {
      name,
      description,
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
  return NextResponse.json(workflow);
}

export async function PATCH(req) {
  const { id, name, description } = await req.json();

  const workflow = await prisma.workflow.update({
    where: { id },
    data: { name, description },
  });

  revalidatePath("/workflows");
  return NextResponse.json(workflow);
}

export async function DELETE(req) {
  const { id } = await req.json();

  await prisma.workflow.delete({ where: { id } });

  revalidatePath("/workflows");
  return NextResponse.json({ ok: true });
}
