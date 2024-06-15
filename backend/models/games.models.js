import mongoose from 'mongoose'

const slotsSchema = mongoose.Schema({
    slotNumber:{
        type: String,
        required:true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    isBooked: {
        type: Boolean,
        default: false
    },
    availableTickets:{
        type:Number,
        default:12
    }
    
},{
    timestamps:true
})

const gamesSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slots:[slotsSchema],
    // feel free to change the date type 
    date:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

//make a model
const Game = mongoose.model('Game' , gamesSchema)

export default Game