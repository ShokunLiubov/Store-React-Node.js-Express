import express from 'express'
import errorMiddleware from '../middleware/error.middleware'
import { authRouter } from './auth.router'
import { categoryRouter } from './category.router'
import { classificationRouter } from './classification.router'
import { countryTMRouter } from './countryTM.router'
import { deliveryRouter } from './delivery.router'
import { madeInRouter } from './madeIn.router'
import { orderRouter } from './order.router'
import { productsRouter } from './products.router'
import { statsRouter } from './stats.router'
import { storeRouter } from './store.router'
import { typeAromaRouter } from './typeAroma.router'
import { userRouter } from './user.router'

const app = express()

// include routers
app.use('/auth', authRouter)
app.use('/products', productsRouter)
app.use('/orders', orderRouter)
app.use('/users', userRouter)
app.use('/category', categoryRouter)
app.use('/classification', classificationRouter)
app.use('/type-aroma', typeAromaRouter)
app.use('/made-in', madeInRouter)
app.use('/country-tm', countryTMRouter)
app.use('/store', storeRouter)
app.use('/delivery', deliveryRouter)
app.use('/stats', statsRouter)

app.use(errorMiddleware)

export { app as appRouters }
// module.exports = { appConfig: app };
