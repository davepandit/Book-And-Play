import Game from "../models/games.models.js"

export const addSlotHandler = async(req , res) => {
    //taking data from the frontend and note that the slotsInGame is going to be an array of objetcs and basically it need to be destructured
    const {name , slotsInGame , date } = req.body
    console.log('slots:',slotsInGame)
    try {
        const gameSlotsForEachDay = await Game.create({
            name:name,
            date:date,
            slots:slotsInGame
        })

        res.status(201).json({
            message:'Slots added for today'
        })
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
}

//slots availibilty
export const checkAvailibilityHandler = async(req , res) => {
    const game = req.query.game
    const date = req.query.date
    //the name and the game  name will be taken from the query params 
    try {
        //serach on the basis of date
        const gameDoc = await Game.findOne({
            date:date,
            name:game
        })
        if(!gameDoc){
            res.status(404).json({
                message:'No slots found for the given date'
            })
        }else{
            res.status(200).json(gameDoc)
            //remember to access the slots from the gameDoc in the frontend
        }
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}