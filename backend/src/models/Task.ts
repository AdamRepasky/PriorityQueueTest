// backend/src/models/Task.ts

export interface Task {
    id: string;
    name: string;
    priority: number; // higher = more important
    progress: number; // 0-100
    createdAt: Date;
  }
  
export interface TaskDTO {
  id: string;
  name: string;
  priority: number;
  progress: number;
  createdAt: string; // ISO string pre JSON
}

export function toDTO(t: Task): TaskDTO {
  return {
    id: t.id,
    name: t.name,
    priority: t.priority,
    progress: t.progress,
    createdAt: t.createdAt.toISOString(),
  };
}