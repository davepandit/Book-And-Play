import express from 'express'
import { signupUser , generateOTP } from '../controllers/users.controllers.js'

//router
const router = express.Router()

router.post('/signup' , signupUser)
router.get('/generateOTP' , generateOTP)

export default router