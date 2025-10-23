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
        <div className="min-height-task">
          {queuedTasks.length === 0 ? (
            <p>No tasks in queue</p>
          ) : (
            queuedTasks.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </div>
      </div>

      {/* Completed */}
      <div className="mb-4">
        <h3>Completed Tasks</h3>
        <div className="min-height-task">
          {completedTasks.length === 0 ? (
            <p>No completed tasks</p>
          ) : (
            completedTasks.map((task) => <TaskItem key={task.id} task={task} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;