import { createFood, getFoods } from "../../../controller/actions/foods";
import { useSelector } from "react-redux";
import { selectSelectedMeal } from "../../../controller/redux/diarySlice";
import { Col, Container, Row, Button } from "reactstrap";
import { useState } from "react";
import { Link, useNavigate, useSearchParams, Navigate } from "react-router-dom";
import TargetsCard from "../../Components/TargetsCard/TargetsCard";
import { PieChart } from "react-minimal-pie-chart";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import './FoodView.css'
import Loading from "../../Components/Loading/Loading";
import FoodDetail from "../../Components/FoodDetail/FoodDetail";
import { getMeals } from "../../../controller/actions/meals";
import Header from "../../Header/Header";
const FoodView =()=>{
    const[currentFood, setCurrentFood] = useState();
    const[loading, setLoading] = useState(true)
    let searchParams = window.location.pathname.split('/')[2];
    const fid = searchParams

    const dispatch = useDispatch();

    useEffect(()=>{
        getMeals(dispatch);
     },[]);


    const getData=async(id)=>{
        const res = await axios.get(
            `https://api.nal.usda.gov/fdc/v1/food/${id}?api_key=4BAQvdwNXntfME2nFGFqcQZXYHjB4qkvIkUHh1vR`);
            setCurrentFood(res.data)
            setLoading(false)
    }
    
    useEffect(() => {
        getData(fid)
      },[]);
    
    

    const selectedMeal = useSelector(selectSelectedMeal);
    console.log(selectedMeal)
    
    
    if(loading){
        return (
            <>
                <Header/>
                <Loading/>
            </>
        )
    }else if(selectedMeal !== "Breakfast" 
        && selectedMeal !== "Lunch" 
        && selectedMeal !== "Dinner"
        && selectedMeal !== "Snack"   ){

            return(
        <Navigate to='/home'/>)
    }
    
    else{
        return (
            <>
                <Header/>
                <FoodDetail currentFood={currentFood} meal={selectedMeal}/>
            </>
        )
    }

}

export default FoodView