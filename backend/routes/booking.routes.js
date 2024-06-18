import express from "express"
import {bookSlotHandler , getMyBookings , markavailibilityHandler , getAllBookings , markNotReportedHandler} from '../controllers/booking.controllers.js'
import { adminCheck, validateToken } from "../middlewares/auth.middlewares.js"

const router = express.Router()

router.post('/bookslot' , validateToken , bookSlotHandler)
router.get('/getmybookings' , validateToken , getMyBookings)
//admin route 
router.post('/markavailibility' , validateToken , adminCheck , markavailibilityHandler)
//mark the candidate as not reported
router.post('/marknotreported' , validateToken , adminCheck , markNotReportedHandler)
router.get('/getallBookings' , validateToken , adminCheck , getAllBookings)

export default router