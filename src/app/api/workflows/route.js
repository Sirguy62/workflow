import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all workflows
export async function GET() {
  const workflows = await prisma.workflow.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(workflows);
}

// CREATE workflow + stages
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
    include: {
      stages: true,
    },
  });

  return NextResponse.json(workflow);
}

// UPDATE workflow
export async function PATCH(req) {
  const { id, name, description } = await req.json();

  const workflow = await prisma.workflow.update({
    where: { id },
    data: { name, description },
  });

  return NextResponse.json(workflow);
}

// DELETE workflow
export async function DELETE(req) {
  const { id } = await req.json();

  await prisma.workflow.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
