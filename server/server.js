import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv/config'
import bodyParser from 'body-parser';
import { foodRouter } from './routes/foods.js';
import { mealRouter } from './routes/meals.js';
import { authRouter } from './routes/auth.js';
import errorHandler from './middleware/error.js';
import { diaryRouter } from './routes/diary.js';
import { apiRouter } from './routes/apifetch.js';

const app = express();

mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology:true},(err)=>{
    if(!err){
        return console.log("connected to database");
    }
    console.log(err);
})


const PORT = process.env.PORT 

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json({limit:"30mb", extended: true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use(cookieParser());
app.use(cors());

app.use('/foods', foodRouter)
app.use('/meals', mealRouter)
app.use('/auth', authRouter)
app.use('/diary', diaryRouter)
app.use('/api', apiRouter)



app.use(errorHandler)


const server = app.listen(PORT, ()=>{
    console.log("Listening")
})

process.on("unhandledRejection", (err, promise)=>{
    console.log(err);
    server.close(()=>process.exit(1))
})