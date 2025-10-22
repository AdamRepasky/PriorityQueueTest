// src/components/TaskItem.tsx
import React from "react";
import type { TaskDTO } from "../types/Task";

interface TaskItemProps {
  task: TaskDTO;
  isCurrent?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isCurrent = false }) => {
  const progressStyle = { width: `${task.progress}%` };

  return (
    <div
      className={`mb-3 p-3 border rounded ${
      isCurrent ? "border-primary bg-white shadow-sm" : "bg-light text-dark"}`}
      style={isCurrent ? { boxShadow: "0 6px 18px rgba(13,110,253,0.08)" } : undefined}
      aria-current={isCurrent ? "true" : undefined}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="d-flex align-items-center gap-2">
            <strong>{task.name}</strong>
            <span className="badge bg-secondary">#{task.id.slice(0, 6)}</span>
            <span className="ms-2 text-muted" style={{ fontSize: "0.85rem" }}>
              {new Date(task.createdAt).toLocaleString()}
            </span>
          </div>
          <div className="text-muted" style={{ fontSize: "0.85rem" }}>
            Priority: <span className="fw-semibold">{task.priority}</span>
          </div>
        </div>

        <div className="text-end">
          <div className="small text-muted">Progress</div>
          <div className="fw-bold">{task.progress}%</div>
        </div>
      </div>

      <div className="progress mt-2" style={{ height: "10px" }}>
        <div
          className={`progress-bar ${task.progress >= 100 ? "bg-success" : isCurrent ? "bg-primary" : "bg-success"}`}
          role="progressbar"
          style={progressStyle}
          aria-valuenow={task.progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span className="visually-hidden">{task.progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
