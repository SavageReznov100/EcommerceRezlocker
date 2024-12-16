dotenv.config();
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoute from "./routes/orderRoute.js";
import newsRoute from "./routes/newsRoute.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/product", productRoute);
app.use("/api", userRoute);
app.use("/api", cartRoute);
app.use("/api", orderRoute);
app.use("/api", newsRoute);

mongoose.connect(process.env.MONGODB_DB_CONNECTION_STRING).then(() => {
  app.listen(process.env.P0RT, () => {
    console.log(
      "connected to the database and listening on port",
      process.env.PORT
    );
  });
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  });
});
