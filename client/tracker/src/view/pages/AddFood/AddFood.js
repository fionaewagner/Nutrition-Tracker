import { useState } from "react";
import { Button, Row, Col } from "reactstrap";
import './AddFood.css'
import { useDispatch, useSelector } from "react-redux";
import { addFood } from "../../../controller/redux/diarySlice";
import { createFood, getFoods } from "../../../controller/actions/foods";
import { Link } from 'react-router-dom'
import { setSelectedFood } from "../../../controller/redux/diarySlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faMagnifyingGlass,
  faPenToSquare
  
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../Header/Header";
import { getData } from "../../../controller/actions/api";
import { selectResults } from "../../../controller/redux/apiSlice";

const fetch = require("node-fetch");
const axios = require("axios")



const AddFood=({meal})=>{
    const queryReturnItems = useSelector(selectResults)
    console.log("return items: " + queryReturnItems)
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [foodsEaten, setFoodsEaten] = useState([])
    const dispatch = useDispatch();
    

    let calIdx = -1;

    let fatIdx = -1; 
    let carbIdx = -1;
    let proIdx = -1;

    let ironIdx = -1;
    let calciumIdx = -1;
    let magIdx = -1;
    let zincIdx = -1;
    let potasIdx = -1;

    const titleCapitals = (string)=>{
        const words = string.toLowerCase().split(" ");
    
        for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        const output = words.join(" ");
        
        return output;

    }

   


    const sendQuery=async()=>{
       
        console.log("sending query: " + query)
        getData(query, dispatch)
         
    }   

    const handleSubmit=(name, calories)=>{
        console.log(name)
        const newFood={
            foodName: name, 
            foodCal: calories
        }
        createFood(newFood)
        getFoods(setFoodsEaten,foodsEaten);

    }
    
    return(
        <div>
            <Header/>
            <Row className='add-food-title'>
                <h1>Add Food</h1>
            </Row>
            <Row className="add-food-search-bar">
                <Col className="add-food-search-bar-field">
                    <FontAwesomeIcon className="add-food-search-icon" icon={faMagnifyingGlass}  />
                    <input className="add-food-search-input" placeholder="Search all foods..." onChange={(e)=>setQuery(e.target.value)}>
                    </input>
                </Col>
                <Col xs='3' className="mt-4">
                    <Button onClick={sendQuery}>
                        {"  "}Search
                    </Button>
                </Col>
            </Row>
            
            <div  className="add-food-item-rows">
            
            
            {queryReturnItems.map((food)=>{
                console.log("res" + food)
                if(!food.hasOwnProperty('foodNutrients')){
                    calIdx = -1
                    fatIdx = -1
                    carbIdx = -1
                    proIdx = -1

                    ironIdx = -1;
                    calciumIdx = -1;
                    magIdx = -1;
                    zincIdx = -1;
                    potasIdx = -1;

                }else if(food.foodNutrients.length === 0) {
                    calIdx = -1
                    fatIdx = -1
                    carbIdx = -1
                    proIdx = -1

                    ironIdx = -1;
                    calciumIdx = -1;
                    magIdx = -1;
                    zincIdx = -1;
                    potasIdx = -1;

                }
                else if(food.foodNutrients[0].hasOwnProperty('nutrient')){
                    calIdx = food.foodNutrients.findIndex((el)=>el.nutrient.id===1008)
                    fatIdx = food.foodNutrients.findIndex((el)=>el.nutrient.id===1004)
                    carbIdx = food.foodNutrients.findIndex((el)=>el.nutrient.id===1005)
                    proIdx = food.foodNutrients.findIndex((el)=>el.nutrient.id===1003)

                    ironIdx = food.foodNutrients.findIndex((el)=>el.nutrient.id===1089)
                    calciumIdx = food.foodNutrients.findIndex((el)=>el.nutrient.id===1087)
                    magIdx = food.foodNutrients.findIndex((el)=>el.nutrient.id===1090)
                    zincIdx = food.foodNutrients.findIndex((el)=>el.nutrient.id===1095)
                    potasIdx = food.foodNutrients.findIndex((el)=>el.nutrient.id===1092)
                    
                }else{
                    calIdx = food.foodNutrients.findIndex((el)=>el.nutrientId===1008)
                    fatIdx = food.foodNutrients.findIndex((el)=>el.nutrientId===1004)
                    carbIdx = food.foodNutrients.findIndex((el)=>el.nutrientId===1005)
                    proIdx = food.foodNutrients.findIndex((el)=>el.nutrientId===1003)

                    ironIdx = food.foodNutrients.findIndex((el)=>el.nutrientId===1089)
                    calciumIdx = food.foodNutrients.findIndex((el)=>el.nutrientId===1087)
                    magIdx = food.foodNutrients.findIndex((el)=>el.nutrientId===1090)
                    zincIdx = food.foodNutrients.findIndex((el)=>el.nutrientId===1095)
                    potasIdx = food.foodNutrients.findIndex((el)=>el.nutrientId===1092)
                }
                let tempFoodName = food.description
                if(food.hasOwnProperty('brandName')){
                    
                    tempFoodName += ", " + food.brandName;
                }

                const foodName = titleCapitals(tempFoodName)

                if(calIdx === -1 || fatIdx === -1 || carbIdx === -1 || proIdx === -1
                    || ironIdx === -1 || calciumIdx === -1 || magIdx === -1 || zincIdx === -1 || potasIdx === -1)
                    {
                    return(
                        <></>
                    )
                } else
            return(
                <div>
                    <Row className="food-item">
                        
                        <Col xs='12'>
                            <Link to={`${food.fdcId}`} className='add-food-link' onClick={()=>dispatch(setSelectedFood(food))}>
                                {foodName}
                            </Link>
                        </Col>
                        <Col>
                            <p>{calIdx !=-1 ? food.foodNutrients[calIdx].value : "Unknown"} Calories</p>
                        </Col>
                        <Col>
                            <Link to={`${food.fdcId}`} className='add-food-link' onClick={()=>dispatch(setSelectedFood(food))}>
                                <FontAwesomeIcon icon={faPenToSquare}  />
                            </Link>
                        </Col>
                        
                    </Row>
                   
                </div>
            )
        })}
            
        </div>
        </div>
        

    )
}

export default AddFood;