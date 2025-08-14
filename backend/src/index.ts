import express from "express";
import { Request, Response } from "express";
import { serve } from "inngest/express";
import { inngest } from "./inngest/index";
import { functions as inngestFunctions } from "./inngest/functions";
import { logger } from "./utils/logger";
import { connectDB } from "./utils/db";

const app = express();

// parse JSON body
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

// set up inngest endpoint
app.use("/api/inngest", serve({ client: inngest, functions: inngestFunctions }));

app.get("/api/chat", (req: Request, res: Response) => {
  res.send("Hi, how many I help you today?");
});

const startServer = async () => {
  try {
    // Connect to Mongo DB first
    await connectDB();

    // The start the server
    const PORT = process.env.PORT || 3001;

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Inngest endpoint available at http://locahost:${PORT}/api/inngest`);
    });
  } catch (error) {
    logger.error("Failed to start server: ", error);
    process.exit(1);
  }
};

startServer();
