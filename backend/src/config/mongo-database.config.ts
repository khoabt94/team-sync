import { config } from "@config/app.config";
import mongoose from "mongoose";

export default async function () {
  const mongoConnectUri = config.MONGO_URI.replace("<MONGO_USER_NAME>", config.MONGO_USER_NAME).replace(
    "<MONGO_USER_PASSWORD>",
    config.MONGO_USER_PASSWORD
  );
  try {
    await mongoose.connect(mongoConnectUri);
    console.log("Connected to mongo database");
  } catch (error) {
    console.error("Fail to connect to mongo database");
    process.exit(1);
  }
}
