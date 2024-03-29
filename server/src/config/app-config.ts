import cookieParser from 'cookie-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
dotenv.config()
const app = express()

app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	}),
)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// security
app.use(helmet())
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
		},
	}),
)

// sending BD
// seedingDevData.refresh
// seedingDevData.sendingData

export { app as appConfig }
// module.exports = { appConfig: app };
