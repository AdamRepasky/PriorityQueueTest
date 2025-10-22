// src/App.tsx
import { useQueue } from "./hooks/useQueue";
import TaskList from "./components/TaskList";
import TaskControls from "./components/TaskControls";

export default function App() {
  const { queue, completed, currentTaskId, loading, refresh } = useQueue();

  const queuedOnly = currentTaskId ? queue.filter((t) => t.id !== currentTaskId) : queue;
  const currentTask = queue.find((t) => t.id === currentTaskId) || null;

  return (
    <div className="container my-4" style={{ maxWidth: 1000 }}>
      <h1 className="text-center mb-4">Task Queue</h1>

      <TaskControls onAfterChange={refresh} />

      {loading ? (
        <div className="mb-3">Loading tasks…</div>
      ) : (
        <>
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
