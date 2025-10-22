import React from "react";
import type { TaskDTO } from "../types/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: TaskDTO[];
  title?: string;
  highlightFirst?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, highlightFirst = true }) => {
  return (
    <div className="mb-4">
      {tasks.length === 0 ? (
        <p className="text-muted">No tasks</p>
      ) : (
        tasks.map((task, idx) => {
          const isCurrent = highlightFirst && idx === 0 && task.progress < 100;
          return <TaskItem key={task.id} task={task} isCurrent={isCurrent} />;
        })
      )}
    </div>
  );
};

export default TaskList;
