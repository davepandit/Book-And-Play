import express from 'express'
import { signupUser , generateOTP , loginUser , logoutUser} from '../controllers/users.controllers.js'

//router
const router = express.Router()

router.post('/signup' , signupUser)
router.post('/generateOTP' , generateOTP)
router.post('/login' , loginUser)
router.post('/logout' , logoutUser)

export default router