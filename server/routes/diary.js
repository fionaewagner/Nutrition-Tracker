import express  from "express";
import { createDiary, deleteAllDiaries, deleteDiary, getDiaries, getTodaysDiaries, updateDiary } from "../controller/diary.js";


export const diaryRouter = express.Router()

diaryRouter.route("/").get(getDiaries);
diaryRouter.route("/get/:diaryDate").get(getTodaysDiaries);
diaryRouter.route("/create").post(createDiary);
diaryRouter.delete('/:_id',deleteDiary);
diaryRouter.delete('/',deleteAllDiaries);
diaryRouter.patch('/:_id', updateDiary);