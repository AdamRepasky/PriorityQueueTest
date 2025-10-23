// src/components/TaskList.tsx
import React from "react";
import type { TaskDTO } from "../types/Task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  currentTask?: TaskDTO | null;
  queuedTasks: TaskDTO[];
  completedTasks: TaskDTO[];
}

const TaskList: React.FC<TaskListProps> = ({ currentTask, queuedTasks, completedTasks }) => {
  const renderTaskList = (tasks: TaskDTO[], emptyMessage: string) =>
    tasks.length === 0 ? (
      <p>{emptyMessage}</p>
    ) : (
      tasks.map((task) => <TaskItem key={task.id} task={task} />)
    );

  return (
    <div className="mb-4 queue-container text-center">
      {/* Current Task */}
      <div className="mb-4">
        <h3>Currently Processing</h3>
        <div className="min-height-task">
          {currentTask ? (
            <TaskItem task={currentTask} isCurrent />
          ) : queuedTasks.length === 0 ? (
            <p>No task running.</p>
          ) : (
            <>
              <div className="spinner-grow spinner-grow-sm" role="status"></div>
              <span> Waiting to start next task…</span>
            </>
          )}
        </div>
      </div>

      {/* Queue */}
      <div className="mb-4">
        <h3>Queue (by priority)</h3>
        <div className="min-height-task">{renderTaskList(queuedTasks, "No tasks in queue")}</div>
      </div>

      {/* Completed */}
      <div className="mb-4">
        <h3>Completed Tasks</h3>
        <div className="min-height-task">{renderTaskList(completedTasks, "No completed tasks")}</div>
      </div>
    </div>
  );
};

export default TaskList;