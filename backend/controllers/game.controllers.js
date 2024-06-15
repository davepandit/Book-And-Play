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