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
        {currentTask ? (<TaskItem task={currentTask} isCurrent />) : <p>No task running.</p>}
      </div>

      {/* Queue */}
      <div className="mb-4">
        <h3>Queue (by priority)</h3>
        {queuedTasks.length === 0 ? (
          <p>No tasks in queue</p>
        ) : (
          queuedTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>

      {/* Completed */}
      <div className="mb-4">
        <h3>Completed Tasks</h3>
        {completedTasks.length === 0 ? (
          <p>No completed tasks</p>
        ) : (
          completedTasks.map((task) => <TaskItem key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

export default TaskList;