import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const workflow = await prisma.workflow.findFirst({
    include: { stages: true },
  });

  if (!workflow || workflow.stages.length === 0) {
    return NextResponse.json(
      { error: "No workflow or stage found" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    workflowId: workflow.id,
    stageId: workflow.stages[0].id,
  });
}
