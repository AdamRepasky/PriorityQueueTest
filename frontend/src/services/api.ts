import type { TaskDTO } from "../types/Task";

const BASE_URL = "http://localhost:3000/api/tasks";

export async function fetchQueue(): Promise<TaskDTO[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch queue");
  return res.json();
}

export async function fetchCompleted(): Promise<TaskDTO[]> {
  const res = await fetch(`${BASE_URL}/completed`);
  if (!res.ok) throw new Error("Failed to fetch completed tasks");
  return res.json();
}

export async function addTask(name: string, priority: number): Promise<TaskDTO> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, priority }),
  });
  if (!res.ok) throw new Error("Failed to add task");
  return res.json();
}

export async function clearCompleted(): Promise<void> {
  const res = await fetch(`${BASE_URL}/completed`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to clear completed tasks");
}
