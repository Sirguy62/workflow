// lib/workflow.service.js
import { prisma } from "@/lib/prisma";

export async function getWorkflows() {
  return prisma.workflow.findMany({
    orderBy: { createdAt: "desc" },
  });
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
