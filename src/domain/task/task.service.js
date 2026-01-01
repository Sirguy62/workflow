import { prisma } from "@/lib/db";

export async function createTask(data) {
  return prisma.task.create({ data });
}

export async function moveTask({ taskId, toStageId }) {
  return prisma.task.update({
    where: { id: taskId },
    data: { stageId: toStageId },
  });
}

export async function deleteTask(taskId) {
  return prisma.task.delete({
    where: { id: taskId },
  });
}

export async function updateTask(taskId, data) {
  return prisma.task.update({
    where: { id: taskId },
    data,
  });
}
