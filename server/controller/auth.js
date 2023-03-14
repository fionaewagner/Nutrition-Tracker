import express, { json } from 'express'
import mongoose from 'mongoose';
import User from '../Model/userModel.js'
import ErrorResponse from '../utils/errResponse.js';
import crypto from 'crypto'

export const getUsers = async(req, res, next)=>{
    try {
        const users = await User.find({})
        res.json(users)
        
    } catch (error) {
        next(err)
        
    }
}

export const getUser = async (req, res) => {
    const { _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id: ${_id}`);
    const user = await User.findById(_id);
    res.json(user);
  }

export const updateUser = async (req, res) => {
    const { _id } = req.params;
    const {
        username,
        weight,
        height,
        sex,
        activity, 
        calories } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No user with id: ${_id}`);
  
    const updatedUser = {
        username,
        weight,
        height,
        sex,
        activity, 
        calories  };
  
    await User.findByIdAndUpdate(_id, updatedUser, { new: true });
  
    res.json(updatedUser);
  }
export const register = async (req, res, next) => {
    console.log('registering')
    console.log(req.body);
    const { username, email, password,weight,
        height,sex,activity, calories } = req.body;
  
    try {
      const user = await User.create({
        username,
        email,
        password,
        weight,
        height,
        sex,
        activity,
        calories
      });
  
      sendToken(user, 200, res);
    } catch (err) {
      next(err);
    }
  };

export const login =async(req, res, next)=>{
    const {email, password} = req.body

    if(!email || !password){
       return next(new ErrorResponse("Please provide an email and password",400))
    }
    try{
        const user = await User.findOne({email}).select("+password");
        console.log(user)

        if(!user){
           return next(new ErrorResponse("Invalid Credentials", 401))
        }

        const isMatch = await user.matchPassword(password);
        
        if(!isMatch){
            return next(new ErrorResponse("Invalid Credentials", 401))
        }

        sendToken(user,201,res);
        

    }
    catch(error){
        res.status(500).json({
            success:false,
            error: error.message
        })

    }
}

const sendToken=(user, statusCode,res)=>{
    const token = user.getSignedToken();
    res.status(statusCode).json({success:true,token,
        _id: user._id,
        username: user.username, 
        weight: user.weight,
        height: user.height,
        sex: user.sex,
        activity: user.activity,
        calories: user.calories })
}




