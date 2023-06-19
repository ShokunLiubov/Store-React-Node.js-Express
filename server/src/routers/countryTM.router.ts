import Router from 'express'
import controller from '../controllers/countryTM.controller'

const router = Router()

router.get('/', controller.getAllCountryTM)

export { router as countryTMRouter }
