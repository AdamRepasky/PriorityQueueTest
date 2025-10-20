// backend/src/services/QueueService.ts
import { Task, toDTO } from "../models/Task";
import EventEmitter from "events";
import { v4 as uuidv4 } from "uuid";

/**
 * QueueService — In-memory priority queue with:
 *  ✓ aging to prevent starvation
 *  ✓ periodic processing
 *  ✓ progress updates
 *  ✓ task completion tracking
 *
 * Emits events:
 *  - 'queue_changed'  -> payload: { queue: TaskDTO[], completed: TaskDTO[] }
 *  - 'task_progress'  -> payload: TaskDTO
 *  - 'task_completed' -> payload: TaskDTO
 */
export class QueueService extends EventEmitter {
  private tasks: Task[] = [];
  private completed: Task[] = [];
  private agingFactor = 10;           // smaller = older tasks gain priority faster
  private tickIntervalMs = 5000;      // process queue every 5 seconds
  //private tickHandle?: NodeJS.Timeout;
  private tickHandle: NodeJS.Timeout | undefined;

  constructor() {
    super();
    this.startProcessing();           // auto-start processing
  }

  /** Creates and adds a new task to the queue */
  public async addTask(name: string, priority: number): Promise<Task> {
    const task: Task = {
      id: uuidv4(),
      name,
      priority,
      progress: 0,
      createdAt: new Date(),
    };
    this.tasks.push(task);
    this.emitQueueChanged();
    return task;
  }

  /** Returns the queue sorted by effective priority (highest first) */
  public async getQueue(): Promise<Task[]> {
    return this.tasks
      .slice()
      .sort((a, b) => this.effectivePriority(b) - this.effectivePriority(a));
  }

  /** Returns completed tasks sorted by newest first */
  public async getCompleted(): Promise<Task[]> {
    return this.completed
      .slice()
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  /** Clears completed tasks */
  public async clearCompleted(): Promise<void> {
    this.completed = [];
    this.emitQueueChanged();
  }

  /** Computes effective priority with aging */
  private effectivePriority(task: Task): number {
    const ageSeconds = Math.floor((Date.now() - task.createdAt.getTime()) / 1000);
    return task.priority + ageSeconds / this.agingFactor;
  }

  /**
   * One tick of processing:
   *  - find highest effective priority task
   *  - increase progress 10–20%
   *  - if progress >= 100 → move to completed
   */
  public async processTick(): Promise<void> {
    if (this.tasks.length === 0) return;

    // sort a copy by effective priority
    const sorted = this.tasks.slice().sort((a, b) => this.effectivePriority(b) - this.effectivePriority(a));
    const current = sorted[0];
    if (!current) return;

    // find index of task in original array
    const idx = this.tasks.findIndex((t) => t.id === current.id);
    if (idx === -1) return;       // TS happy: index may not exist

    const task = this.tasks[idx];
    if (!task) return;             // TS happy: task is now definitely defined

    // if already completed, move it
    if (task.progress >= 100) {
      const finished = this.tasks.splice(idx, 1)[0]; // safe: idx exists
      if (finished) {
        this.completed.push(finished);
        this.emit("task_completed", toDTO(finished));
        this.emitQueueChanged();
      }
      return;
    }

    // increase progress randomly 10–20%
    const inc = Math.floor(Math.random() * 11) + 10; // 10..20
    task.progress = Math.min(100, task.progress + inc);

    this.emit("task_progress", toDTO(task));

    // if task completed now
    if (task.progress >= 100) {
      const finished = this.tasks.splice(idx, 1)[0]; // safe: idx exists
      if (finished) {
        this.completed.push(finished);
        this.emit("task_completed", toDTO(finished));
      }
    }

    this.emitQueueChanged();
  }

  /** Start interval processing */
  public startProcessing(): void {
    if (this.tickHandle) return; // already running
    this.tickHandle = setInterval(async () => {
      try {
        await this.processTick();
      } catch (err) {
        console.error("QueueService.processTick error:", err);
      }
    }, this.tickIntervalMs);
  }

  /** Stop interval processing (for tests or graceful shutdown) */
  public stopProcessing(): void {
    if (this.tickHandle) {
      clearInterval(this.tickHandle!); // non-null assertion
      this.tickHandle = undefined;
    }
  }

  /** Emits snapshot of queue + completed tasks */
  private emitQueueChanged() {
    this.emit("queue_changed", {
      queue: this.tasks.map(toDTO),
      completed: this.completed.map(toDTO),
    });
  }
}
