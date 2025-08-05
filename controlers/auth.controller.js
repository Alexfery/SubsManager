import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) throw new Error('User already exists');

        //hash pass
        const salt = await bcrypt.genSalt(10);
       await session.commitTransaction();
    }catch(error)
    {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}
export const signIn = async (req, res, next) => {}
export const signOut = async (req, res, next) => {}