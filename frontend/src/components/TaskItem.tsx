import React from "react";
import type { TaskDTO } from "../types/Task";

interface TaskItemProps {
  task: TaskDTO;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const progressStyle = {
    width: `${task.progress}%`,
  };

  return (
    <div className="mb-3 p-3 border rounded bg-light text-dark">
      <div className="d-flex justify-content-between align-items-center">
        <strong>{task.name}</strong>
        <span>Priority: {task.priority}</span>
      </div>
      <div className="progress mt-2">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={progressStyle}
          aria-valuenow={task.progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {task.progress}%
        </div>
      </div>
      <small className="text-muted">Created: {new Date(task.createdAt).toLocaleString()}</small>
    </div>
  );
};

export default TaskItem;