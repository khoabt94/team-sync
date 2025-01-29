import "dotenv/config";
import { config } from "@config/app.config";
import connectMongoDB from "@config/mongo-database.config";
import baseMiddleware from "@middlewares/base.middleware";
import routesMiddleware from "@middlewares/route.middleware";
import { errorHandler } from "@middlewares/error-handler.middleware";
import express from "express";
import passport from "passport";
import "@config/passport.config";

const app = express();

// Middleware
baseMiddleware(app);
routesMiddleware(app);

// error handler
app.use(errorHandler);

// app start
app.listen(config.PORT, async () => {
  console.log(`Listening on port ${config.PORT}`);
  await connectMongoDB();
});
