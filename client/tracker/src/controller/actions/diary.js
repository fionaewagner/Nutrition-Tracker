import { config } from "@fortawesome/fontawesome-svg-core";
import { setDiaries, setFoods, setTodayDiary } from "../redux/diarySlice";
const axios = require("axios")
const url = 'http://localhost:5000/diary';

export const getDiaries=async(dispatch)=>{
      try {
        console.log("getting diaries");
            const {data} = await axios.get(url);
            console.log(data);
            dispatch(setDiaries(data));
      } catch (error) {
        console.log(error);
      }
  
  }
  export const getTodaysDiaries=async(diaryDate, dispatch)=>{
    try {
      console.log("getting diaries " + diaryDate);
          const {data} = await axios.get(`${url}/get/${diaryDate}`);
          console.log(data);
          dispatch(setTodayDiary(data));
    } catch (error) {
      dispatch(setTodayDiary(null))
    }

}

  export const updateDiary = async (_id, diary) => {
    console.log("this id is: " + _id)
    try {
      axios.patch(`${url}/${_id}`, diary);
    } catch (error) {
      console.log(error.message);
    }
  };

  export const deleteDiary=async(_id)=>{
          try{
            axios.delete(`${url}/${_id}`)
          }catch(error){
            console.log(error);
          }
  }

  export const createDiary=async(diary,dispatch)=>{

  
    const {
        diaryDate,
        totalCals,
        totalCarbs,
        totalFat,
        totalProtien,
        weight} = diary;
        
        
      try {
          const config = {
              header: {
                "Content-Type": "application/json",
              },
            };
  
          const {data} = await axios.post( `${url}/create`,
          {
            diaryDate,
            totalCals,
            totalCarbs,
            totalFat,
            totalProtien,
            weight
          },
          config
        ); 
        console.log(data) 
        getDiaries(dispatch)  
      } catch (error) {
        console.log(error)
          
      }
  
  }