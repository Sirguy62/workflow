import { prisma } from "@/lib/prisma";


export async function getWorkflows() {
  return prisma.workflow.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function createWorkflow({ name, description }) {
  return prisma.$transaction(async (tx) => {
    const workflow = await tx.workflow.create({
      data: { name, description },
    });

    // default stages
    await tx.stage.createMany({
      data: [
        { name: "Backlog", order: 1, workflowId: workflow.id },
        { name: "In Progress", order: 2, workflowId: workflow.id },
        { name: "Review", order: 3, workflowId: workflow.id },
        { name: "Done", order: 4, workflowId: workflow.id },
      ],
    });

    return workflow;
  });
}

export async function deleteWorkflow(id) {
  return prisma.workflow.delete({ where: { id } });
}

export async function getWorkflowById(id) {
  return prisma.workflow.findUnique({
    where: { id },
    include: {
      stages: {
        orderBy: { order: "asc" },
        include: {
          tasks: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });
}

