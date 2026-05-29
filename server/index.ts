import "dotenv/config";
import express from "express";
import cors from "cors";
import os from "os";
import { handleDemo } from "./routes/demo";

// Simple in-memory user database
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

const users: User[] = [
  {
    id: "1",
    name: "Student Demo",
    email: "student@example.com",
    password: "demo123"
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "password123"
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456"
  }
];

// Simple token storage (in-memory for demo)
const tokens = new Map<string, { userId: string; expiresAt: number }>();

function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function createServer() {
  const app = express();

  // Middleware - Enable CORS for cross-laptop access
  app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: false
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Get local network IP address
  const getLocalIP = () => {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.family === "IPv4" && !iface.internal) {
          return iface.address;
        }
      }
    }
    return "localhost";
  };

  // Authentication endpoint
  app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken();
    tokens.set(token, {
      userId: user.id,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  });

  // Logout endpoint
  app.post("/api/logout", (req, res) => {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (token) {
      tokens.delete(token);
    }
    res.json({ message: "Logged out successfully" });
  });

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Server info endpoint for cross-laptop access
  app.get("/api/server-info", (_req, res) => {
    res.json({
      message: "ExamHub Server",
      ip: getLocalIP(),
      port: process.env.PORT || 8080,
      status: "running"
    });
  });

  // Exam endpoints
  app.get("/api/exams", (_req, res) => {
    res.json({
      exams: [
        {
          id: "1",
          title: "General Knowledge 101",
          category: "General",
          duration: 45,
          questions: 50,
          difficulty: "Easy"
        },
        {
          id: "2",
          title: "Advanced Mathematics",
          category: "Mathematics",
          duration: 90,
          questions: 40,
          difficulty: "Hard"
        },
        {
          id: "3",
          title: "Biology Fundamentals",
          category: "Science",
          duration: 60,
          questions: 60,
          difficulty: "Medium"
        }
      ]
    });
  });

  app.get("/api/exam/:examId", (req, res) => {
    const { examId } = req.params;
    res.json({
      id: examId,
      title: `Exam ${examId}`,
      description: "Sample exam",
      questions: []
    });
  });

  app.post("/api/exam-results", (req, res) => {
    const { examId, score, answers } = req.body;
    res.json({
      success: true,
      examId,
      score,
      timestamp: new Date().toISOString()
    });
  });

  return app;
}
