import Router from 'express'
import controller from '../controllers/user.controller'
import { EnumRoles } from '../enums/roles.enum'
import authMiddleware from '../middleware/auth.middleware'
import roleMiddleware from '../middleware/role.middleware'

const router = Router()

router.post('/info', authMiddleware, controller.postUserInfo)
router.put('/info', authMiddleware, controller.updateUserInfo)
router.get('/info', authMiddleware, controller.getUserInfo)
router.get('/', roleMiddleware([EnumRoles.ADMIN]), controller.getUsers)
router.get('/city', roleMiddleware([EnumRoles.ADMIN]), controller.getCity)

export { router as userRouter }
