import { Router } from 'express'
import { usersController } from '../../controllers'
import { usersValidators } from '../../middlewares'
import { pagination } from '../../middlewares/pagination'

const router = Router()

router.post('/', usersValidators.create, usersController.create)

router.get('/', pagination, usersValidators.search, usersController.search)

export default router
