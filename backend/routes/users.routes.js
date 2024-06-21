import express from 'express'
import { signupUser , generateOTP , loginUser , logoutUser , updateProfileHandler} from '../controllers/users.controllers.js'
import { validateToken } from '../middlewares/auth.middlewares.js'

//router
const router = express.Router()

router.post('/signup' , signupUser)
router.post('/generateOTP' , generateOTP)
router.post('/login' , loginUser)
router.post('/logout' , logoutUser)
//update profile
router.patch('/updateprofile', validateToken , updateProfileHandler)

export default router