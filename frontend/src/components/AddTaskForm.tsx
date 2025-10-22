// src/components/AddTaskForm.tsx
import React, { useState } from "react";
import { addTask } from "../services/api";

export default function AddTaskForm({ onDone }: { onDone?: () => void }) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!Number.isFinite(priority) || priority < 0) {
      setError("Priority must be a non-negative number");
      return;
    }
    setLoading(true);
    try {
      await addTask(name.trim(), priority);
      setName("");
      setPriority(10);
      onDone?.();
    } catch (err: any) {
      console.error("Add task failed", err);
      setError(err?.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mb-3 d-flex gap-2 align-items-center">
      <input
        className="form-control"
        placeholder="Task name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
      />
      <input
        className="form-control"
        type="number"
        min={0}
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        style={{ width: 110 }}
        disabled={loading}
      />
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Adding…" : "Add Task"}
      </button>

      {error && <div className="text-danger ms-2 small">{error}</div>}
    </form>
  );
}
