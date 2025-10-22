// src/hooks/useQueue.ts
import { useState, useEffect } from "react";
import type { TaskDTO } from "../types/Task";
import { fetchQueue, fetchCompleted } from "../services/api";
import { io, Socket } from "socket.io-client";

export function useQueue() {
  const [queue, setQueue] = useState<TaskDTO[]>([]);
  const [completed, setCompleted] = useState<TaskDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<Socket | null>(null);

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
    setSocket(s);

    s.on("connect", () => {
      console.log("Connected to WebSocket:", s.id);
      s.emit("join_queue"); // join real-time updates
    });

    // Listen for full queue updates
    s.on("queue_update", (payload: { queue: TaskDTO[]; completed: TaskDTO[] }) => {
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
      setQueue((prev) => prev.filter((t) => t.id !== task.id));
      setCompleted((prev) => [task, ...prev]);
    });

    return () => {
      s.disconnect();
    };
  }, []);

  return { queue, completed, loading, refresh };
}
