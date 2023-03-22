import * as dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import { appConfig } from './config/app'
import { appRouters } from './routers/routers'

dotenv.config()

const PORT = process.env.PORT || 5001
const app = express()

app.use(appConfig)

app.use(appRouters)

const mongooseConfig = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, mongooseConfig)
    app.listen(PORT, () => console.log(`server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()




