import express, { Request, Response } from "express";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer } from "socket.io";

const PORT = 3000;
const app = express();

// Middleware
app.use(cors()); // allow frontend requests
app.use(express.json()); // parse JSON body

// API route (placeholder)
app.get("/api/tasks", (_req: Request, res: Response) => {
  res.json([]); // todo
});

// Health check
app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
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

  socket.on("join_queue", () => {
    socket.emit("queue_update", { queue: [], completed: [] });
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", socket.id, reason);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
