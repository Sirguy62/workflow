import { normalizeTask } from "../../src/lib/normalizeTask";

test("keeps valid priority", () => {
  const task = { priority: "High" };
  expect(normalizeTask(task).priority).toBe("High");
});

test("fixes invalid priority", () => {
  const task = { priority: 2 };
  expect(normalizeTask(task).priority).toBe("Low");
});

test("fixes missing priority", () => {
  const task = {};
  expect(normalizeTask(task).priority).toBe("Low");
});
