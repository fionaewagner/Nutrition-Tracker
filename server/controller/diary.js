import express from 'express'
import mongoose from 'mongoose';
import Diary from '../model/diaryModel.js';

export const getDiaries = async(req, res, next)=>{
    try {
        const diaries = await Diary.find({})
        res.status(200).json(diaries)
        
    } catch (error) {
        next(error)
    }
}

export const getTodaysDiaries = async(req, res, next)=>{
  try {
      const { diaryDate } = req.params;
      const diaries = await Diary.findOne({diaryDate: diaryDate})
      res.status(200).json(diaries)
      
  } catch (error) {
      next(error)
  }
}
export const createDiary = async (req, res, next) => {
    const {
        diaryDate,
        totalCals,
        totalCarbs,
        totalFat,
        totalProtien,
        weight} = req.body;
  
    try {
      const diary = await Diary.create({
        diaryDate,
        totalCals,
        totalCarbs,
        totalFat,
        totalProtien,
        weight
      });

      await diary.save()
      res.status(201).json(diary);
  
    } catch (err) {
      next(err);
    }
  };

  export const deleteDiary = async (req, res, next) => {
        const { _id } = req.params;
    
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No diary with id: ${_id}`);
    
        await Diary.findByIdAndRemove(_id);
    
        res.json({ message: "Diary deleted successfully." });
    
}

export const deleteAllDiaries = async (req,res, next)=>{
    await Diary.deleteMany();
    res.json({ message: "Diary deleted successfully." });

}

export const updateDiary = async (req, res) => {
  const { _id } = req.params;
  const {
    diaryDate,
    totalCals,
    totalCarbs,
    totalFat,
    totalProtien,
    weight } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No diary with id: ${_id}`);

  const updatedDiary = {
    diaryDate,
    totalCals,
    totalCarbs,
    totalFat,
    totalProtien,
    weight  };

  await Diary.findByIdAndUpdate(_id, updatedDiary, { new: true });

  res.json(updateDiary);
}


const diaryRouter = express.Router