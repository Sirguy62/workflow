import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// CREATE
export async function POST(req) {
  const { title, priority, dueDate, stageId, workflowId } = await req.json();

  if (!title || !stageId || !workflowId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const task = await prisma.task.create({
    data: {
      title,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      stageId,
      workflowId,
    },
  });

  return NextResponse.json(task);
}

// UPDATE (edit title / priority / dueDate / stage move)
export async function PATCH(req) {
  const { id, title, priority, dueDate, stageId } = await req.json();

  const task = await prisma.task.update({
    where: { id },
    data: {
      title,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      stageId,
    },
  });

  return NextResponse.json(task);
}

// DELETE
export async function DELETE(req) {
  const { id } = await req.json();

  await prisma.task.delete({ where: { id } });

  return NextResponse.json({ ok: true });
}
