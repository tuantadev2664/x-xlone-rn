import express from "express";
import { Cursor } from "mongoose";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routers/user.route.js";

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.use("/api/users", userRoutes);

const startServer = async () => {
  try {
    // Wait for database connection before starting the server
    await connectDB();
    console.log("Database connected successfully");

    app.listen(ENV.PORT, () => {
      console.log("Server is running on port:", ENV.PORT);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
