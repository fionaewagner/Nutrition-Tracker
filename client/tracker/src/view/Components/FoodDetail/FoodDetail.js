import { createFood, getFoods } from "../../../controller/actions/foods";
import { useSelector } from "react-redux";
import { selectSelectedMeal, selectTodayDiary } from "../../../controller/redux/diarySlice";
import { Col, Container, Row, Button, Card } from "reactstrap";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import TargetsCard from "../../Components/TargetsCard/TargetsCard";
import { PieChart } from "react-minimal-pie-chart";
import { useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import './FoodDetail.css'
import { updateDiary } from "../../../controller/actions/diary";
import MicroTargets from "../MicroTargets/MicroTargets";

const FoodDetail=({currentFood, meal})=>{

    console.log(currentFood)
    const diaries = useSelector(selectTodayDiary);

    let calIdx = -1;
    let fatIdx = -1; 
    let carbIdx = -1;
    let proIdx = -1;

    let ironIdx = -1;
    let calciumIdx = -1;
    let magIdx = -1;
    let zincIdx = -1;
    let potasIdx = -1;

    let initialCals = "Unknown"
    let initialFats = "Unknown"
    let initialCarbs = "Unknown"
    let initialProtein = "Unknown"

    let initialIron = "Unknown"
    let initialCalcium = "Unknown"
    let initialMag = "Unknown"
    let initialZinc = "Unknown"
    let initialPotassium = "Unknown"

    if(currentFood.foodNutrients[0].hasOwnProperty('nutrient')){
        calIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrient.id===1008)
        fatIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrient.id===1004)
        carbIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrient.id===1005)
        proIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrient.id===1003)

        ironIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrient.id===1089)
        calciumIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrient.id===1087)
        magIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrient.id===1090)
        zincIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrient.id===1095)
        potasIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrient.id===1092)

        initialCals = calIdx !==-1 ? currentFood.foodNutrients[calIdx].amount : "Unknown"
        initialFats = fatIdx !==-1 ? currentFood.foodNutrients[fatIdx].amount : "Unknown"
        initialCarbs = carbIdx !==-1 ? currentFood.foodNutrients[carbIdx].amount : "Unknown"
        initialProtein = proIdx !==-1 ? currentFood.foodNutrients[proIdx].amount : "Unknown"

        initialIron = ironIdx !==-1 ? currentFood.foodNutrients[ironIdx].amount : "Unknown"
        initialCalcium = calciumIdx !==-1 ? currentFood.foodNutrients[calciumIdx].amount : "Unknown"
        initialMag = magIdx !==-1 ? currentFood.foodNutrients[magIdx].amount : "Unknown"
        initialZinc = zincIdx !==-1 ? currentFood.foodNutrients[zincIdx].amount : "Unknown"
        initialPotassium = potasIdx !==-1 ? currentFood.foodNutrients[potasIdx].amount : "Unknown"

    }else{
        calIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrientId===1008)
        fatIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrientId===1004)
        carbIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrientId===1005)
        proIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrientId===1003)

        ironIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrientId===1089)
        calciumIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrientId===1087)
        magIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrientId===1090)
        zincIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrientId===1095)
        potasIdx = currentFood.foodNutrients.findIndex((el)=>el.nutrientId===1092)

        initialCals = calIdx !==-1 ? currentFood.foodNutrients[calIdx].value : "Unknown"
        initialFats = fatIdx !==-1 ? currentFood.foodNutrients[fatIdx].value : "Unknown"
        initialCarbs = carbIdx !==-1 ? currentFood.foodNutrients[carbIdx].value : "Unknown"
        initialProtein = proIdx !==-1 ? currentFood.foodNutrients[proIdx].value : "Unknown"

        initialIron = ironIdx !==-1 ? currentFood.foodNutrients[ironIdx].value : "Unknown"
        initialCalcium = calciumIdx !==-1 ? currentFood.foodNutrients[calciumIdx].value : "Unknown"
        initialMag = magIdx !==-1 ? currentFood.foodNutrients[magIdx].value : "Unknown"
        initialZinc = zincIdx !==-1 ? currentFood.foodNutrients[zincIdx].value : "Unknown"
        initialPotassium = potasIdx !==-1 ? currentFood.foodNutrients[potasIdx].value : "Unknown"

    }

    const [cals, setCals] = useState(initialCals);
    const [fats, setFats] = useState(initialFats);
    const [protiens, setProtiens] = useState(initialProtein);
    const [carbs, setCarbs] = useState(initialCarbs);
    const [serving, setServing] = useState(1);

    const [iron, setIron] = useState(initialIron);
    const [calcium, setCalcium] = useState(initialCalcium);
    const [magnesium, setMagnesium] = useState(initialMag);
    const [zinc, setZinc] = useState(initialZinc);
    const [potassium, setPotassium] = useState(initialPotassium);

    const goalCarbs = 225;
    const goalFats = 44;
    const goalProtein = 50;

    const goalIron = 18;
    const goalCalcium = 1000;
    const goalMagnesium = 400;
    const goalZinc = 10
    const goalPotassium = 4700;


    let servingSize= currentFood.hasOwnProperty('servingSize') 
    ? currentFood.servingSize 
    : currentFood.hasOwnProperty('foodMeasures') && currentFood.foodMeasures.length > 0 && currentFood.foodMeasures[0].disseminationText !== undefined 
    ? currentFood.foodMeasures[0].disseminationText 
    : "One Serving"

    if(currentFood.hasOwnProperty('servingSizeUnit')){

        servingSize += " " + currentFood.servingSizeUnit;

    }

    const titleCapitals = (string)=>{
        const words = string.toLowerCase().split(" ");
    
        for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        const output = words.join(" ");
        
        return output;

    }

    let tempFoodName = currentFood.description
                if(currentFood.hasOwnProperty('brandName')){
                    tempFoodName += ", " + currentFood.brandName;
                }

    const foodName = titleCapitals(tempFoodName)

    const navigate = useNavigate();

    const handleSubmit=(name, calories,fat, carb, protien, niron, ncalcium, nmagnesium, nzinc, npotassium)=>{
       
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const day = new Date().getDate();

        const todaysDate = month + "/" + day + "/" + year


        const newFood={
            foodName: name, 
            foodCal: calories,
            foodFat: fat,
            foodCarb: carb,
            foodProtien: protien,
            foodIron: niron,
            foodCalcium: ncalcium,
            foodMagnesium: nmagnesium,
            foodZinc: nzinc,
            foodPotassium: npotassium,
            foodServings: serving,
            foodServingSize: servingSize,
            foodMeal: meal,
            dateEaten: todaysDate
        }
        createFood(newFood);
        navigate("../home", { replace: true });

    }

    const roundNumber=(num)=>{
        const newNum = Math.round(num * 10) / 10;
        return newNum;
    }

    return(
        <Container className="food-view g-0">
        <Row >
            
            <Col >
                <h1 className="food-detail-title text-center">{foodName}</h1>
            </Col>  
           
        </Row>
        <div>
            <Row className="food-detail-servings">
            <Col/>
                <Col xs='2' sm='1'>
                    <input className="serving-size-input" placeholder='1' type="number" onChange={(e)=>{
                        if(initialCals !== "Unknown"){
                            setCals(roundNumber(initialCals * e.target.value));
                        }
                        if(initialFats !== "Unknown"){
                            setFats(roundNumber(initialFats * e.target.value));
                        }
                        if(initialProtein !== "Unknown"){
                            setProtiens(roundNumber(initialProtein * e.target.value));
                        }
                        if(initialCarbs !== "Unknown"){
                            setCarbs(roundNumber(initialCarbs * e.target.value));
                        }
                        if(initialIron !== "Unknown"){
                            setIron(roundNumber(initialIron * e.target.value));
                        }
                        if(initialCalcium !== "Unknown"){
                            setCalcium(roundNumber(initialCalcium * e.target.value));
                        }
                        if(initialMag !== "Unknown"){
                            setMagnesium(roundNumber(initialMag * e.target.value));
                        }
                        if(initialZinc !== "Unknown"){
                            setZinc(roundNumber(initialZinc * e.target.value));
                        }
                        if(initialPotassium !== "Unknown"){
                            setPotassium(roundNumber(initialPotassium * e.target.value));
                        }
                        setServing(e.target.value);
                        
                    }}></input>
                </Col>
                <Col xs='2' className="serving-size-text color-gray">
                    <p>Standard Serving ({servingSize})</p>
                </Col>
                <Col>
                    <Button className="food-detail-add-food align-items-center" 
                        onClick={()=>handleSubmit(foodName, cals, fats, carbs, protiens, iron, calcium, magnesium, zinc, potassium)}>
                       <FontAwesomeIcon icon={faPlus}  />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TargetsCard carbPercent={Math.min((carbs * 100) / goalCarbs, 100)} fatPercent={Math.min((fats * 100) / goalCarbs, 100)}
                                protienPercent={Math.min((protiens * 100) / goalProtein, 100)} totalCarbs={carbs} totalFats={fats} totalProtien={protiens}/>
                </Col>
                <Col xs='3'className="food-detail-circle">
                    <h2 className="food-detail-circle-text">{cals}</h2>
                    <h2 className="color-gray">Calories</h2>
                </Col>
            </Row>
            <Row>
            <MicroTargets iron={iron} calcium={calcium} magnesium={magnesium} zinc={zinc} potassium={potassium}/>
        </Row>
        </div>
        </Container>
    )
}

export default FoodDetail