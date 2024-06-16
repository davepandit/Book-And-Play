import express from "express"
import {bookSlotHandler} from '../controllers/booking.controllers.js'
import { validateToken } from "../middlewares/auth.middlewares.js"

const router = express.Router()

router.post('/bookslot' , validateToken , bookSlotHandler)

export default router