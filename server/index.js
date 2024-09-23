import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import connectDB from "./mongodb/connect.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// Load environment variables
dotenv.config();

// Create an instance of the express application
const app = express();
// Add the CORS middleware
app.use(cors({origin: "https://dall-e-clone-client-seven.vercel.app", credentials: true}));
// origin: "https://dall-e-clone-client-seven.vercel.app"
// Configure express to parse JSON requests
app.use(express.json({ limit: "50mb" }));

// API routes
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// General routes
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E Cloneaazzzzaaaa");
});

// Connect to MongoDB
connectDB(process.env.MONGODB_URL);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
