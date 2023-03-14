import express from 'express'
import mongoose from 'mongoose';
import Diary from '../model/diaryModel.js';
import axios from 'axios'

export const getData = async(req, res, next)=>{
    const { query } = req.params;
    console.log(query)
        try{
            const ndbRes = await axios.get(
                `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=15&api_key=${process.env.API_KEY}`
              );
            const data = ndbRes.data.foods
            res.status(200).json(data)
            }
    catch (error) {
        next(error)
    }
}