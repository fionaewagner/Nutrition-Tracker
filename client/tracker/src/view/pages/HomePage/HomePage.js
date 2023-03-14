import './HomePage.css'
import { useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { Button, Col, Container, Row, Card} from 'reactstrap';
import  Diary  from '../../Components/Diary/Diary';
import { getFoods } from '../../../controller/actions/foods';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllDiaries, selectAllEatenFoods, selectTodayDiary, selectTodayFoods } from '../../../controller/redux/diarySlice';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import TargetsCard from '../../Components/TargetsCard/TargetsCard';
import Loading from '../../Components/Loading/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  
    faCircle
    
  } from "@fortawesome/free-solid-svg-icons";
import { createDiary, getDiaries, getTodaysDiaries, updateDiary } from '../../../controller/actions/diary';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUser } from '../../../controller/actions/auth';
import { selectUser } from '../../../controller/redux/authSlice';
import Header from '../../Header/Header';


const HomePage=()=>{
    const token = sessionStorage.getItem("authToken")
    
    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const diaries = useSelector(selectTodayDiary);
    
    const user = useSelector(selectUser);

    const userCals = user.calories

    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDate();

    const todaysDate = month + "a" + day + "a" + year

    useEffect(()=>{
        getTodaysDiaries(todaysDate, dispatch);
        getUser(sessionStorage.getItem("userId"), dispatch)
        if(diaries != null){
            setTimeout(() => {
            
            const diary = {
                totalCals: totalCalories,
                totalCarbs: totalCarbs,
                totalFat: totalFats,
                totalProtien: totalProtien,
                weight: user.weight
            }
            console.log("updating diary" + diary.totalCals)
            updateDiary(diaries._id, diary )},1000)
        }
     },[]);

    

    const today = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"});
    
    const lineWidth = 60;

    const foods = useSelector(selectTodayFoods)

    const allfoods = useSelector(selectAllEatenFoods)

    const allDates = allfoods.map(e=>e.dateEaten)
    //add every food in all foods eaten to array based on date

    //reduce each array to single value (totalCalories)

    //plot values


    const totalCalories = foods.reduce((sum, elum)=> {
        return sum += elum.foodCal;
  },0);
      
    const totalCarbs = foods.reduce((sum, elum)=> {
            return sum += elum.foodCarb;
      },0)
    const totalFats = foods.reduce((sum, elum)=> {
        return sum += elum.foodFat;
        },0)
    const totalProtien = foods.reduce((sum, elum)=> {
        return sum += elum.foodProtien;
        },0)

    const totalIron = foods.reduce((sum, elum)=> {
        return sum += elum.foodIron;
    },0)
    const totalCalcium = foods.reduce((sum, elum)=> {
        return sum += elum.foodCalcium;
    },0)
    const totalMagnesium = foods.reduce((sum, elum)=> {
        return sum += elum.foodMagnesium;
    },0)
    const totalZinc = foods.reduce((sum, elum)=> {
        return sum += elum.foodZinc;
    },0)
    const totalPotassium = foods.reduce((sum, elum)=> {
        return sum += elum.foodPotassium;
    },0)
    
    

     

     if(diaries === null){
        console.log("yes")
        const diary = {
            diaryDate: todaysDate,
            totalCals: totalCalories,
            totalCarbs: totalCarbs,
            totalFat: totalFats,
            totalProtien: totalProtien,
            weight: user.weight
        }
        setTimeout(() => {
            if(diaries===null){
                console.log("oh well")
                createDiary(diary, dispatch)
            }
          }, "1000")
    }
     
    console.log(diaries)
    

    const goalCarbs = 225;
    const goalFats = 44;
    const goalProtein = 50; 

    const caloriesLeft = Math.floor(userCals - totalCalories)

    let carbPercentConsumed = (totalCarbs * 100) / goalCarbs;
    let fatPercentConsumed =  (totalFats * 100) / goalFats;
    let protienPercentConsumed = (totalProtien * 100) / goalProtein;
    
    if(carbPercentConsumed > 100){
        carbPercentConsumed = 100;
    }

    if(fatPercentConsumed > 100){
        fatPercentConsumed = 100;
    }

    if(protienPercentConsumed > 100){
        protienPercentConsumed = 100;
    }

    
    
    if(!token){
        navigate("../", { replace: true });
    }
    else if(!user){
        navigate("../", { replace: true });
    }
    
    else{

     
      return (
        <>
        <Header/>
        <Container>
            
            <div className="home-page">
                <Row className='home-page-text'>
                    <Col>
                        <h2 className='text-center'>{today}</h2>
                    </Col>
                </Row>
                <Row className='mb-2'>
                    <Col  className='home-page-targets'>
                        <TargetsCard  carbPercent={carbPercentConsumed} fatPercent={fatPercentConsumed}
                        protienPercent={protienPercentConsumed} totalCarbs={totalCarbs} totalFats={totalFats} totalProtien={totalProtien}/>
                    </Col>
                    <Col xs='3'>
                        <PieChart
                            data={[{ value: totalCalories, color: '#B2E3AF' },
                            { value: caloriesLeft, color: '#D6FAC3' }]}
                            totalValue={100}
                            lineWidth={20}
                            label={() => totalCalories + " Calories" }
                            labelStyle={{
                                fontSize: '10px',
                                fontFamily: 'sans-serif',
                                fill: '#d1c9af',
                            }}
                            labelPosition={0}
                        />
                    </Col>
                </Row>
                <Row>
                    <Card className='minerals-card'>
                        <Row className='pt-1'>
                            <Col className='text-center'>
                                <p>Iron</p>
                            </Col>
                            <Col className='text-center'>
                                <p>Calcium</p>
                            </Col>
                            <Col className='text-center'>
                                <p>Magnesium</p>
                            </Col>
                            <Col className='text-center'>
                                <p>Zinc</p>
                            </Col>
                            <Col className='text-center'>
                                <p>Potassium</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col className='text-center mb-3'>
                                <span className="fa-stack fa-xl sp">
                                    <FontAwesomeIcon className='circle-icon iron fa-2x' icon={faCircle}/>
                                        <strong className="fa-stack-1x iron-text">{totalIron + "mg"}</strong>
                                </span>
                            </Col>
                            <Col className='text-center'>
                                <span className="fa-stack fa-xl sp">
                                    <FontAwesomeIcon className='circle-icon calcium fa-2x' icon={faCircle}/>
                                        <strong className="fa-stack-1x iron-text">{totalCalcium + "mg"}</strong>
                                </span>
                            </Col>
                            <Col className='text-center'>
                                <span className="fa-stack fa-xl sp">
                                    <FontAwesomeIcon className='circle-icon magnesium fa-2x' icon={faCircle}/>
                                        <strong className="fa-stack-1x iron-text">{totalMagnesium + "mg"}</strong>
                                </span>
                            </Col>
                            <Col className='text-center'>
                                <span className="fa-stack fa-xl sp">
                                    <FontAwesomeIcon className='circle-icon zinc fa-2x' icon={faCircle}/>
                                        <strong className="fa-stack-1x iron-text">{totalZinc + "mg"}</strong>
                                </span>
                            </Col>
                            <Col className='text-center'>
                            <span className="fa-stack fa-xl sp">
                                    <FontAwesomeIcon className='circle-icon potassium fa-2x' icon={faCircle}/>
                                        <strong className="fa-stack-1x iron-text">{totalPotassium + "mg"}</strong>
                                </span>
                            </Col>

                        </Row>
                    </Card>
                </Row>
                
                <div className='meal-one'>
                    <Diary meal={"Breakfast"}/>
                </div>
                <div className='meal-two'>
                    <Diary meal={"Lunch"}/>
                </div>
                <div className='meal-three'>
                    <Diary meal={"Dinner"}/>
                </div>
                <div className='meal-four'>
                    <Diary meal={"Snack"}/>
                </div>
                
                
            </div>
            
        
        </Container>
        </>
        
      );
                        }
    
    

}

export default HomePage