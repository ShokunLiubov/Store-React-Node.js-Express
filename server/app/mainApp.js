import cookieParser from "cookie-parser"
import cors from "cors"
import * as dotenv from "dotenv"
import express from "express"
import helmet from "helmet"
import errorMiddleware from "../middleware/errorMiddleware"
import * as routers from "../routers/routers"
import seedingDevData from '../seeding/seeding'
dotenv.config()
const app = express()

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
        optionSuccessStatus: 200,
    })
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use(helmet())
app.use(helmet.hidePoweredBy())
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
        },
    })
)

app.use("/auth", routers.authRouter)
app.use("/products", routers.productsRouter)
app.use("/orders", routers.orderRouter)
app.use("/users", routers.userRouter)
app.use("/category", routers.categoryRouter)
app.use("/classification", routers.classificationRouter)

app.use(errorMiddleware)

// sending BD
seedingDevData.refresh
seedingDevData.sendingData

export { app as mainApp }

