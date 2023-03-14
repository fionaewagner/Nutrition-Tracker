import { createFood, getFoods, updateFood } from "../../../controller/actions/foods";
import { useSelector } from "react-redux";
import { selectSelectedFood } from "../../../controller/redux/diarySlice";
import { Col, Container, Row, Button, Card } from "reactstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TargetsCard from "../../Components/TargetsCard/TargetsCard";
import { PieChart } from "react-minimal-pie-chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faFloppyDisk
  
} from "@fortawesome/free-solid-svg-icons";
import Header from "../../Header/Header";

const FoodEditView =()=>{
    const selectedFood = useSelector(selectSelectedFood);
    console.log(selectedFood)
    const servingSize= selectedFood.foodServingSize;
    const foodServings = selectedFood.foodServings;
    const meal = selectSelectedFood.foodMeal;

    const goalCarbs = 225;
    const goalFats = 44;
    const goalProtein = 50;
    

    const initialCals = selectedFood.foodCal / foodServings;
    const initialFats =  selectedFood.foodFat / foodServings;
    const initialCarbs = selectedFood.foodCarb / foodServings;
    const initialProtein = selectedFood.foodProtien / foodServings;

    const initialIron = selectedFood.foodIron / foodServings;
    const initialCalcium=  selectedFood.foodCalcium / foodServings;
    const initialMag = selectedFood.foodMagnesium / foodServings;
    const initialZinc = selectedFood.foodZinc / foodServings;
    const initialPotassium = selectedFood.foodPotassium / foodServings;

    const savedCals = selectedFood.foodCal;
    const savedFats =  selectedFood.foodFat ;
    const savedCarbs = selectedFood.foodCarb ;
    const savedProtien = selectedFood.foodProtien ;

    const savedIron = selectedFood.foodIron;
    const savedCalcium = selectedFood.foodCalcium;
    const savedMag = selectedFood.foodMagnesium;
    const savedZinc = selectedFood.foodZinc;
    const savedPotassium = selectedFood.foodPotassium;
    
    const [cals, setCals] = useState(savedCals);
    const [fats, setFats] = useState(savedFats);
    const [protiens, setProtiens] = useState(savedProtien);
    const [carbs, setCarbs] = useState(savedCarbs);
    

    const [iron, setIron] = useState(savedIron);
    const [calcium, setCalcium] = useState(savedCalcium);
    const [magnesium, setMagnesium] = useState(savedMag);
    const [zinc, setZinc] = useState(savedZinc);
    const [potassium, setPotassium] = useState(savedPotassium);
    
    const [serving, setServing] = useState(1);

    

    
    const navigate = useNavigate();

    const handleSubmit=(name, calories,fat, carb, protien, niron, ncalcium, nmagnesium, nzinc, npotassium)=>{
        console.log(name)
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
            dateEaten: selectedFood.dateEaten
        }
        updateFood(selectedFood._id, newFood);
        navigate("../home", { replace: true });

    }

    const roundNumber=(num)=>{
        const newNum = Math.round(num * 10) / 10;
        return newNum;
    }

    return(
        <>
        <Header/>
        <Container className="food-view">
        <Row >
            
            <Col >
                <h1 className="food-detail-title text-center">{selectedFood.foodName}</h1>
            </Col>  
           
        </Row>
        <Row className="food-detail-servings">
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
                <Col xs='2' className="serving-size-text">
                    <p>Standard Serving ({servingSize})</p>
                </Col>
                <Col>
                <Button className="food-detail-add-food align-items-center" onClick={()=>handleSubmit(selectedFood.description, cals, fats, carbs, protiens,iron, calcium, magnesium, zinc, potassium)}>
                    <FontAwesomeIcon icon={faFloppyDisk}  />
                </Button>
                </Col>
            </Row>
        <Row>
            <Col>
                <TargetsCard carbPercent={Math.min((carbs * 100) / goalCarbs, 100)} fatPercent={Math.min((fats * 100) / goalCarbs, 100)}
                            protienPercent={Math.min((protiens * 100) / goalProtein, 100)} totalCarbs={carbs} totalFats={fats} totalProtien={protiens}/>
            </Col>
            <Col xs='3'>
                <PieChart
                    data={[{ value: (cals * 100) /2000, color: '#A65886' },
                    { value: 100-((cals * 100) /2000), color: 'whitesmoke' }]}
                    totalValue={100}
                    lineWidth={20}
                    label={() => cals + " Calories" }
                    labelStyle={{
                    fontSize: '10px',
                    fontFamily: 'sans-serif',
                    fill: 'white',
                    }}
                    labelPosition={0}
                    />
            </Col>
        </Row>
        <Row>
            <Card className='minerals-card'>
                <Row>
                    <Col>
                        <p>Iron {iron}</p>
                    </Col>
                    <Col>
                        <p>Calcium {calcium}</p>
                    </Col>
                    <Col>
                        <p>Magnesium {magnesium}</p>
                    </Col>
                    <Col>
                        <p>Zinc {zinc}</p>
                    </Col>
                    <Col>
                        <p>Potassium {potassium}</p>
                    </Col>
                 </Row>
            </Card>
        </Row>
        
        </Container>
        </>
    )

}

export default FoodEditView;