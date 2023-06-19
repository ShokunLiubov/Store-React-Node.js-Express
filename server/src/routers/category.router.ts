import Router from 'express'
import controller from '../controllers/category.controller'

const router = Router()

router.get('/', controller.getAllCategory)

export { router as categoryRouter }
