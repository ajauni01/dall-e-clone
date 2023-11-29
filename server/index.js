import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

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

// function to listen to the port
const startServer = async () => {
  // connect to mongoDB
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(5000, () =>
      console.log("Server is running on port http://localhost:5000")
    );
  } catch (error) {
    console.log(error);
  }
};
startServer();


