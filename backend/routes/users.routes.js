import express from 'express'
import { signupUser , generateOTP , loginUser } from '../controllers/users.controllers.js'

//router
const router = express.Router()

router.post('/signup' , signupUser)
router.get('/generateOTP' , generateOTP)
router.post('/login' , loginUser)

export default router