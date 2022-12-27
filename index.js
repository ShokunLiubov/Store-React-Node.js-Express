require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./server/routers/authRouter");
const productsRouter = require("./server/routers/productsRouter");
const customerRouter = require("./server/routers/customerRouter");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./server/middleware/errorMiddleware");

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

app.use(express.urlencoded({ extended: false }));
// listen router
app.get("/", (req, res) => {
  res.send("<h1>Hello Make Up</h1>");
});
app.use("/auth", authRouter);
app.use(productsRouter);
app.use("/customer", customerRouter);
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
