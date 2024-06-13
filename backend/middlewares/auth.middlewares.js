import User from "../models/users.models";
import jwt from 'jsonwebtoken'

export const validateToken = async(req , res , next) => {
    const {token} = req.cookies

    if(token){
        try {
            const decodedToken = jwt.verify(token , process.env.JWT_SECRET)
            req.user = await User.findById(decodedToken.user_id)
            next()
        } catch (error) {
            res.status(404).json({message:'Token doesnot match'})
        }
    }else{
        res.status(404).json({mssg:'Token not found'})
    }
}
