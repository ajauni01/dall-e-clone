import * as dotenv from "dotenv";
import express from "express";
import connectDB from "./mongodb/connect.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";

// Load environment variables
dotenv.config();

// Create an instance of the express application
const app = express();

// Configure express to parse JSON requests
app.use(express.json({ limit: "50mb" }));

// Use cors middleware to handle CORS
app.use(cors());

// API routes
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// General routes
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E Cloneaazzzzaaaa");
});

// Handle OPTIONS requests
app.options("*", cors()); // Respond to preflight requests

// Connect to MongoDB
connectDB(process.env.MONGODB_URL);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
