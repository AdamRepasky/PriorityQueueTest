// src/components/TaskItem.tsx
import React from "react";
import type { TaskDTO } from "../types/Task";

interface TaskItemProps {
  task: TaskDTO;
  isCurrent?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, isCurrent = false }) => {

  return (
    <div
      className={`mb-3 p-3 border rounded bg-light task-text-gray ${
        isCurrent && ("is-current-pulse")}`}
      aria-current={isCurrent ? "true" : undefined}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <div className="d-flex align-items-center gap-2">
            <strong>{task.name}</strong>
            <span className="badge bg-secondary">#{task.id.slice(0, 6)}</span>
            <div className="ms-4 task-text-gray" style={{ fontSize: "0.85rem" }}>
              Priority: <span className="fw-semibold">{task.priority}</span>
            </div>
            <span className="ms-4 task-text-gray" style={{ fontSize: "0.85rem" }}>
              Created at {new Date(task.createdAt).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="text-end">
          <div className="small task-text-gray">Progress</div>
          <div className="fw-bold">{task.progress}%</div>
        </div>
      </div>

      <div className="progress" style={{ height: 20 }}>
        <div
          className={`progress-bar ${isCurrent ? "bg-info progress-bar-striped progress-bar-animated" : "bg-success"}`}
          role="progressbar"
          style={{
            width: `${task.progress}%`,
          }}
          aria-valuenow={task.progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {task.progress}%
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
