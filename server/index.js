import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import * as routers from "./routers/routers";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware";

const PORT = process.env.PORT || 5001;
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(cookieParser());

// app.use(express.urlencoded({ extended: false }));
// // listen router
app.use("/auth", routers.authRouter);
app.use(routers.productsRouter);
app.use(routers.orderRouter);
app.use("/customer", routers.customerRouter);
// Last error meddleware
app.use(errorMiddleware);

// function start app server
const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
