import mongoose from "mongoose";

const mealSchema=mongoose.Schema({
    mealName: String
})

const Meal = mongoose.model('Meal', mealSchema);

export default Meal;