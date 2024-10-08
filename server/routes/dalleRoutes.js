import * as dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
// populate the environental variables
dotenv.config();

// create an express framework instance
const router = express.Router();
// new method
const openai = new OpenAI();
export const maxDuration = 300 * 1000; // 5 minutes

// test route
router.route("/").get((req, res) => {
  res.send("hello from dalleRoutes");
});

// post route
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req?.body;
    const image = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      style: "natural",
      response_format: "b64_json",
    });
    // const image = aiResponse.data[0].b64_json;
    res.status(200).json({ photo: image.data[0].b64_json });
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status); // e.g. 401
      console.error(error.message); // e.g. The authentication token you passed was invalid...
      console.error(error.code); // e.g. 'invalid_api_key'
      console.error(error.type); // e.g. 'invalid_request_error'
    } else {
      // Non-API error
      console.log(error);
    }
  }
});

export default router;
