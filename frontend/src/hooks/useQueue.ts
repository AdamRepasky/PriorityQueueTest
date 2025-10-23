// src/hooks/useQueue.ts
import { useState, useEffect } from "react";
import type { TaskDTO } from "../types/Task";
import { fetchQueue, fetchCompleted } from "../services/api";
import { io } from "socket.io-client";

export function useQueue() {
  const [queue, setQueue] = useState<TaskDTO[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<TaskDTO[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial fetch
  const refresh = async () => {
    setLoading(true);
    try {
      const q = await fetchQueue();
      const c = await fetchCompleted();
      setQueue(q);
      setCompleted(c);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();

    // Connect to backend via WebSocket
    const s = io("http://localhost:3000");

    s.on("connect", () => {
      s.emit("join_queue"); // join real-time updates
    });

    // Listen for full queue updates
    s.on("queue_update", (payload: { currentTaskId: string | null; queue: TaskDTO[]; completed: TaskDTO[] }) => {
      setCurrentTaskId(payload.currentTaskId);
      setQueue(payload.queue);
      setCompleted(payload.completed);
    });

    // Listen for task progress
    s.on("task_progress", (task: TaskDTO) => {
      setQueue((prev) =>
        prev.map((t) => (t.id === task.id ? task : t))
      );
    });

    // Listen for task completed
    s.on("task_completed", (task: TaskDTO) => {
      setCurrentTaskId(null);
      setQueue((prev) => prev.filter((t) => t.id !== task.id));
      setCompleted((prev) => [task, ...prev]);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  return { queue, completed, currentTaskId, loading, refresh };
}
