import { setFoods } from "../redux/diarySlice";
const axios = require("axios")
const url = 'http://localhost:5000/foods';

export const getFoods=async(dispatch)=>{
      try {
        console.log("getting foods");
            const {data} = await axios.get(url);
            console.log(data);
            dispatch(setFoods(data));
      } catch (error) {
        console.log(error);
      }
  
  }

  export const updateFood = async (_id, food) => {
    try {
      axios.patch(`${url}/${_id}`, food);
    } catch (error) {
      console.log(error.message);
    }
  };

  export const deleteFood=async(_id)=>{
          try{
            axios.delete(`${url}/${_id}`)
          }catch(error){
            console.log(error);
          }
  }

  export const createFood=async(food)=>{

  
    const {
        foodName,
        foodCal,
        foodFat,
        foodCarb,
        foodProtien,
        foodIron,
        foodCalcium,
        foodMagnesium,
        foodZinc,
        foodPotassium,
        foodServings,
        foodServingSize,
        foodMeal,
        dateEaten} = food;
        
        console.log(foodCal, foodName)
      try {
          const config = {
              header: {
                "Content-Type": "application/json",
              },
            };
  
          const {data} = await axios.post( `${url}/create`,
          {
            foodName,
            foodCal,
            foodFat,
            foodCarb,
            foodProtien,
            foodIron,
            foodCalcium,
            foodMagnesium,
            foodZinc,
            foodPotassium,
            foodServings,
            foodServingSize,
            foodMeal,
            dateEaten
          },
          config
        ); 
        console.log(data)   
      } catch (error) {
        console.log(error)
          
      }
  
  }