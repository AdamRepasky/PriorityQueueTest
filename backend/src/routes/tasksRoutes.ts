// backend/src/routes/tasksRoutes.ts
import { Router } from "express";
import {
  getQueue,
  getCompleted,
  addTask,
  clearCompleted,
} from "../controllers/tasksController";

export const tasksRouter = Router();

// GET /api/tasks -> get all tasks in queue
tasksRouter.get("/", getQueue);

// GET /api/tasks/completed -> get completed tasks
tasksRouter.get("/completed", getCompleted);

// POST /api/tasks -> add a new task
tasksRouter.post("/", addTask);

// DELETE /api/tasks/completed -> clear completed tasks
tasksRouter.delete("/completed", clearCompleted);
