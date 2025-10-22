// src/App.tsx
import React, { useState } from "react";
import { useQueue } from "./hooks/useQueue";
import TaskList from "./components/TaskList";
import AddTaskForm from "./components/AddTaskForm";
import { clearCompleted } from "./services/api";

export default function App() {
  const { queue, completed, currentTaskId, loading, refresh } = useQueue();
  const [clearing, setClearing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClear = async () => {
    setError(null);
    setClearing(true);
    try {
      await clearCompleted();
      await refresh();
    } catch (err: any) {
      console.error("Clear completed error", err);
      setError(err?.message || "Failed to clear completed");
    } finally {
      setClearing(false);
    }
  };

  const queuedOnly = currentTaskId ? queue.filter((t) => t.id !== currentTaskId) : queue;
  const currentTask = queue.find((t) => t.id === currentTaskId) || null;

  return (
    <div className="container my-4">
      <h1 className="mb-4">Task Queue</h1>

      <AddTaskForm onDone={() => { /* optional: refresh, socket will update anyway */ }} />

      {loading ? (
        <div className="mb-3">Loading tasks…</div>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <button className="btn btn-sm btn-danger me-2" onClick={handleClear} disabled={clearing}>
                {clearing ? "Clearing…" : "Clear completed"}
              </button>
            </div>
          </div>
          <hr />
          {error && <div className="text-danger mb-2">{error}</div>}
          <TaskList
            currentTask={currentTask}
            queuedTasks={queuedOnly}
            completedTasks={completed}
          />
        </>
      )}
    </div>
  );
}
