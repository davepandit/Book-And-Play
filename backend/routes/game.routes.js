//here find adming adding slots routes , 
import express from 'express'
import {addSlotHandler , checkAvailibilityHandler} from '../controllers/game.controllers.js'
//validators
import { validateToken , adminCheck } from '../middlewares/auth.middlewares.js'
const router = express.Router()

router.post('/addslot' , validateToken , adminCheck , addSlotHandler)
router.get('/checkavailibility' , validateToken , checkAvailibilityHandler)

export default router