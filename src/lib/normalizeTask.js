export const VALID_PRIORITIES = ["Low", "Medium", "High"];

export function normalizeTask(task) {
  return {
    ...task,
    priority: VALID_PRIORITIES.includes(task.priority) ? task.priority : "Low",
  };
}

export function normalizeTasks(tasks = []) {
  return tasks.map(normalizeTask);
}
