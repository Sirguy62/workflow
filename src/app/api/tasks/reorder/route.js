import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { tasks } = await req.json();
    // tasks = [{ id, order }]

    if (!Array.isArray(tasks)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    await prisma.$transaction(
      tasks.map((task) =>
        prisma.task.update({
          where: { id: task.id },
          data: { order: task.order },
        })
      )
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("REORDER ERROR:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
