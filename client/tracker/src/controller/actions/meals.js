import { setFoods, setSelectedMeal } from "../redux/diarySlice";
const axios = require("axios")
const url = 'http://localhost:5000/meals';

export const getMeals=async(dispatch)=>{


      try {
        console.log("getting meals");
            const {data} = await axios.get(url);
            console.log(data[0].mealName);
            dispatch(setSelectedMeal(data[0].mealName))
      } catch (error) {
        console.log(error);
      }
  
  }

export const updateMeal = async (meal) => {
    try {
      axios.patch(`${url}/${'6399fef288f9b8e28dec6ca3'}`, meal);
    } catch (error) {
      console.log(error.message);
    }
  };

 

  
  
