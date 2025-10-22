// src/components/TaskControls.tsx
import React, { useState } from "react";
import { addTask, clearCompleted } from "../services/api";

interface Props {
  onAfterChange?: () => void;
}

export default function TaskControls({ onAfterChange }: Props) {
  const [name, setName] = useState("");
  const [priority, setPriority] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
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
      onAfterChange?.();
    } catch (err: any) {
      setError(err?.message || "Failed to add task");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = async () => {
    setError(null);
    setClearing(true);
    try {
      await clearCompleted();
      onAfterChange?.();
    } catch (err: any) {
      setError(err?.message || "Failed to clear completed");
    } finally {
      setClearing(false);
    }
  };

  return (
    <form onSubmit={submit} className="mb-3 p-3 border rounded bg-light">
      <div className="row g-3 align-items-end">

        <div className="col-md-5">
          <label className="form-label">Task Name</label>
          <input
            className="form-control"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="col-md-2">
          <label className="form-label">Priority</label>
          <input
            className="form-control"
            type="number"
            min={0}
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            disabled={loading}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            Add
          </button>
        </div>

        <div className="col-md-3 text-end">
          <button
            type="button"
            className="btn btn-outline-danger w-100 nowrap"
            disabled={clearing}
            onClick={handleClear}
          >
            Clear Completed
          </button>
        </div>
      </div>

      {error && <div className="text-danger small mt-2">{error}</div>}
    </form>
  );
}
