import mongoose from 'mongoose'

//connect to database
export const connectToDatabase = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDb connected at ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('Error in connecting to the database:' , error.message)
        process.exit(1)
    }
}
