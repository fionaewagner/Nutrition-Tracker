import mongoose from "mongoose";

const diarySchema=mongoose.Schema({
    diaryDate: {
        type: String,
        unique: true,
        required: [true, "Please provide a date"],
    },
    totalCals: {
        type: Number,
        required: [true, "Please provide a calorie amount"]
    },
    totalCarbs: {
        type: Number,
        required: [true, "Please provide a carb amount"]
    },
    totalFat:{
        type: Number,
        required: [true, "Please provide a fat amount"]
    },
    totalProtien: {
        type: Number,
        required: [true, "Please provide a protein amount"]
    },
    weight: {
        type: Number,
        required: [true, "Please provide a weight"]
    }

})

const Diary = mongoose.model('Diary', diarySchema);

export default Diary;