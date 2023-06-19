import Router from 'express'
import controller from '../controllers/madeIn.controller'

const router = Router()

router.get('/', controller.getAllMadeIn)

export { router as madeInRouter }
