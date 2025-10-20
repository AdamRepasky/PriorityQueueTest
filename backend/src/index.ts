import express, { Request, Response, NextFunction } from "express";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";
import { tasksRouter } from "./routes/tasksRoutes";
import { queueService } from "./controllers/tasksController";

const PORT = 3000;
const app = express();

// Middleware
app.use(cors()); // allow frontend requests
app.use(express.json()); // parse JSON body

app.use("/api/tasks", tasksRouter);

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(err?.status || 500).json({ error: err?.message || "Internal Server Error" });
});

// Create HTTP server for Socket.IO
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*", // allow all origins for dev
    methods: ["GET", "POST"]
  }
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  // Client must send "join_queue" event if it wants real-time queue data
  socket.on("join_queue", async () => {
    // We fetch current data from QueueService (queue + completed)
    const q = await queueService.getQueue();
    const completed = await queueService.getCompleted();

    // Then we send that snapshot back ONLY to that one socket
    socket.emit("queue_update", {
      queue: q.map((t) => ({ ...t, createdAt: t.createdAt.toISOString() })),
      completed: completed.map((t) => ({ ...t, createdAt: t.createdAt.toISOString() })),
    });
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", socket.id, reason);
  });
});

queueService.on("queue_changed", (payload) => io.emit("queue_update", payload));
queueService.on("task_progress", (task) => io.emit("task_progress", task));
queueService.on("task_completed", (task) => io.emit("task_completed", task));


// Start server
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
