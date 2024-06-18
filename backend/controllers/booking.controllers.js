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

//get my bookings
export const getMyBookings = async(req , res) => {
    try {
        //find the doc with the userid
        const bookingDoc = await Booking.find({
            user:req.user._id
        })

        if(bookingDoc.length == 0){
            res.status(404).json({
                message:'No bookings from your side'
            })
        }else{
            res.status(200).json(bookingDoc)
            //remember the returned value is an array not an object
        }
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

//admin route 
export const getAllBookings= async(req , res) => {
    try {
        //find the the booking docs
        const bookingDocs = await Booking.find({})
        if(bookingDocs.length == 0){
            res.status(404).json({
                message:'No slots booked yet'
        })
        }else{
            res.status(200).json(bookingDocs)
        }
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

//admin route
export const markavailibilityHandler = async(req , res) => {
    // the ground staff available will be having the power to toggle the field as reported or not based on which further credits will be deducted
    //getting the bookingid from the body
    const bookingId = req.body._id
    try {
        const candidateAvailiblity = await Booking.findOneAndUpdate({_id:bookingId},{
            $set:{reported:true}
        },{
            new:true
        })
        res.status(201).json({
            message:'Marked as reported'
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}


export const markNotReportedHandler= async(req , res) => {
    const bookingId = req.body._id
    const creditsToReduce = 5
    try {
        const notReportedDoc = await Booking.findOne({
            _id:bookingId
        })
        if(!notReportedDoc){
            res.status(404).json({
                message:'No bookings found'
            })
        }
        //deduct the credits of the user who has booked the slots
        const updatedCreditsUser = await User.findOneAndUpdate({
            _id:notReportedDoc.user
        },{
            $inc: { credits: -creditsToReduce }
        },{
            new:true
        })

        res.status(201).json({
            message:'Marked as not reported',
            updatedCreditsUser
            //this is sent to the frontend so that the local storage can be updated
        })
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}