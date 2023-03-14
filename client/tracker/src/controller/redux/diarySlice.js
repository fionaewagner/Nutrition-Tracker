import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    foodsEaten: [],
    diaries:[],
    todaysDiary: {},
    totalCalories: 0,
    selectedFood2: {},
    selectedMeal: ""
}

const diarySlice = createSlice({
    name: 'diary',
    initialState,
    reducers:{
        setFoods:(state,action)=>{
            state.foodsEaten = action.payload;
        },
        setSelectedFood:(state, action)=>{
            state.selectedFood = action.payload;
        },
        setSelectedMeal:(state,action)=>{
            state.selectedMeal = action.payload;
        },
        setDiaries:(state,action)=>{
            state.diaries = action.payload;
        },
        setTodayDiary:(state,action)=>{
            state.todaysDiary = action.payload;
        }
        
    }

})

export const diaryReducer = diarySlice.reducer;

export const {setFoods} = diarySlice.actions;

export const {setDiaries} = diarySlice.actions;

export const {setTodayDiary} = diarySlice.actions;

export const {setSelectedFood} = diarySlice.actions;

export const {setSelectedMeal} = diarySlice.actions;

export const selectAllEatenFoods=(state)=>{
    return state.diary.foodsEaten;
}

export const selectAllDiaries=(state)=>{
    return state.diary.diaries;
}

export const selectTodayDiary=(state)=>{
    return state.diary.todaysDiary
}


export const selectTodayFoods=(state)=>{
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();

    const todaysDate = month + "/" + day + "/" + year

    return state.diary.foodsEaten.filter(f=>f.dateEaten === todaysDate)
}

export const selectSelectedFood=(state)=>{
    return state.diary.selectedFood;
}

export const selectSelectedMeal=(state)=>{
    return state.diary.selectedMeal;
}