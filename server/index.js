import cookieParser from "cookie-parser"
import cors from "cors"
import * as dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import mongoose from "mongoose"
import errorMiddleware from "./middleware/errorMiddleware"
import * as routers from "./routers/routers"
dotenv.config()

const PORT = process.env.PORT || 5001
const app = express()
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  }),
)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// security
app.use(helmet()) //standard security packages
app.use(helmet.hidePoweredBy()) //hidden X-Powered-By: Express
app.use(
  helmet.contentSecurityPolicy({
    //does not allow loading another's script
    directives: {
      defaultSrc: ["'self'"], // specify allowed domain here
    },
  }),
)

// // listen router
app.use("/auth", routers.authRouter)
app.use("/products", routers.productsRouter)
app.use("/orders", routers.orderRouter)
app.use("/users", routers.userRouter)

//Error middleware
app.use(errorMiddleware)

// function start app server
const mongooseOptions = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, mongooseOptions)

    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
