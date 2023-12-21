import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import connectDB from "./mongodb/connect.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import postRoutes from "./routes/postRoutes.js";

// load environment variables
dotenv.config();

// create an instance of the express application
const app = express();
// setup CORS middleware
app.use(cors());

// configure express to parse JSON requests
app.use(express.json({ limit: "50mb" }));

// API routes
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// general routes
app.get("/", async (req, res) => {
  res.send("Hello from DALL-E Cloneaazzzzaaaa");
});

// connect to mongoDB
connectDB(process.env.MONGODB_URL);

// CORS function
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

// Export the serverless function
module.exports = allowCors((req, res) => {
  // Forward the request and response objects to Express
  app(req, res);
});
