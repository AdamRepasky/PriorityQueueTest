// backend/src/controllers/tasksController.ts
import { Request, Response } from "express";
import { QueueService } from "../services/QueueService";
import { toDTO } from "../models/Task";

// Create a singleton instance of QueueService
const queueService = new QueueService();

/**
 * GET /api/tasks
 * Returns current queue sorted by effective priority
 */
export const getQueue = async (req: Request, res: Response) => {
  try {
    const queue = await queueService.getQueue();
    res.json(queue.map(toDTO));
  } catch (err) {
    console.error("Error getting queue:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * GET /api/tasks/completed
 * Returns completed tasks
 */
export const getCompleted = async (req: Request, res: Response) => {
  try {
    const completed = await queueService.getCompleted();
    res.json(completed.map(toDTO));
  } catch (err) {
    console.error("Error getting completed tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * POST /api/tasks
 * Adds a new task to the queue
 * Expects body: { name: string, priority: number }
 */
export const addTask = async (req: Request, res: Response) => {
  try {
    const { name, priority } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Task name is required and must be a string" });
    }

    if (priority === undefined || typeof priority !== "number") {
      return res.status(400).json({ error: "Task priority is required and must be a number" });
    }

    const task = await queueService.addTask(name, priority);

    const payload = toDTO(task);
    res.status(201).json(payload);
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * DELETE /api/tasks/completed
 * Clears all completed tasks
 */
export const clearCompleted = async (_req: Request, res: Response) => {
  try {
    await queueService.clearCompleted();
    res.status(204).send(); // No content
  } catch (err) {
    console.error("Error clearing completed tasks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { queueService }; // export for WebSocket integration
