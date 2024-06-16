import Booking from "../models/booking.models.js"
import User from "../models/users.models.js"
import Game from "../models/games.models.js"


export const bookSlotHandler = async(req , res) => {
    //send the spots name and the current credits from the frontend 
    const {sportName , credits , slotNumber , availableTickets , startTime , endTime} = req.body
    try {
        const booking = await Booking.create({
            // sportName send it from the frontend 
            sportName:sportName,
            user:req.user._id,
            mobileNumber:Number(req.user.mobileNumber),
            rollNumber:req.user.rollNumber,
            endTime:endTime,
            startTime:startTime,
            slotNumber:slotNumber
        })
        //deduct credits for user 
        const updatedUser = await User.findOneAndUpdate({
            _id:req.user._id
        },{
            $set:{
                credits:Number(credits) - Number(5)
            }
        },{new:true})
        //reduce the available tickets for the slotnumber send from the frontend
        const updatedSlots = await Game.findOneAndUpdate({
            'slots.slotNumber':slotNumber,
            name:sportName
        },{
            $set: { 'slots.$.availableTickets': Number(availableTickets) - Number(1) }
            //this is a very interesting thinh to use the $(positional operator) here it particularly targets that ele in the slots array where the condition is met otherwise using the slots.availableTickets would simply modify all the element's slots.availableTickets in the slots array
        },{new:true , runValidators: true})

        res.status(201).json({
            message:'Your slot has been booked',
            newCredits:updatedUser.credits
            //sending the new credits so that there can be a slice in the frontend to update the global state credits variable using this credits value
        })
        //here can send a message to the mobile number in the future
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}