import React from "react";
import type { TaskDTO } from "../types/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: TaskDTO[];
  title?: string;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, title }) => {
  return (
    <div className="mb-4">
      {title && <h3 className="mb-3">{title}</h3>}
      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} />)
      )}
    </div>
  );
};

export default TaskList;
