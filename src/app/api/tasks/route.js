import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/* =========================
   GET — load tasks on refresh
========================= */
export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json([], { status: 200 });
  }

  const tasks = await prisma.task.findMany({
    where: {
      workflow: {
        ownerId: session.user.id,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tasks);
}

/* =========================
   POST — create task
========================= */
export async function POST(req) {
  try {
    const {
      title,
      description, // ✅ FIX
      priority = "Low",
      dueDate,
      assigneeEmail,
    } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's first workflow + first stage (Backlog)
    const workflow = await prisma.workflow.findFirst({
      where: { ownerId: session.user.id },
      include: {
        stages: { orderBy: { order: "asc" } },
      },
    });

    if (!workflow || workflow.stages.length === 0) {
      return NextResponse.json({ error: "No workflow found" }, { status: 400 });
    }

    const stageId = workflow.stages[0].id;

    // Optional assignee by email
    let assigneeId = null;
    if (assigneeEmail) {
      const user = await prisma.user.findUnique({
        where: { email: assigneeEmail },
      });
      if (user) assigneeId = user.id;
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null, // ✅ FIX
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        workflowId: workflow.id,
        stageId,
        assigneeId,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (err) {
    console.error("CREATE TASK ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/* =========================
   PATCH — update task
========================= */
export async function PATCH(req) {
  const { id, title, priority, dueDate, stageId, completed } = await req.json();

  const task = await prisma.task.update({
    where: { id },
    data: {
      ...(title !== undefined && { title }),
      ...(priority !== undefined && { priority }),
      ...(dueDate !== undefined && {
        dueDate: dueDate ? new Date(dueDate) : null,
      }),
      ...(stageId !== undefined && { stageId }),
      ...(completed !== undefined && { completed }),
    },
  });

  return NextResponse.json(task);
}


/* =========================
   DELETE — delete task
========================= */
export async function DELETE(req) {
  const { id } = await req.json();

  await prisma.task.delete({
    where: { id },
  });

  return NextResponse.json({ ok: true });
}
