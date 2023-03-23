import express from "express"
import errorMiddleware from "../middleware/errorMiddleware"
import { authRouter } from "./authRouter"
import { categoryRouter } from './categoryRouter'
import { classificationRouter } from './classificationRouter'
import { countryTMRouter } from './countryTMRouter'
import { madeInRouter } from './madeInRouter'
import { orderRouter } from "./orderRouter"
import { productsRouter } from "./productsRouter"
import { storeRouter } from './storeRouter'
import { typeAromaRouter } from './typeAromaRouter'
import { userRouter } from "./userRouter"

const app = express()


// include routers
app.use("/auth", authRouter)
app.use("/products", productsRouter)
app.use("/orders", orderRouter)
app.use("/users", userRouter)
app.use("/category", categoryRouter)
app.use("/classification", classificationRouter)
app.use("/type-aroma", typeAromaRouter)
app.use("/made-in", madeInRouter)
app.use("/country-tm", countryTMRouter)
app.use("/store", storeRouter)

app.use(errorMiddleware)


export { app as appRouters }
