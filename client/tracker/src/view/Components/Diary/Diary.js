import './Diary.css'
import {Row, Col, Button} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllEatenFoods, selectTodayFoods } from '../../../controller/redux/diarySlice';
import { useEffect } from 'react';
import { getFoods } from '../../../controller/actions/foods';
import { deleteFood } from "../../../controller/actions/foods";
import { setSelectedFood, setSelectedMeal } from "../../../controller/redux/diarySlice";
import { updateMeal } from '../../../controller/actions/meals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  
    faPlus
    
  } from "@fortawesome/free-solid-svg-icons";

const Diary =({meal})=>{
    const allFoodsFromDB = useSelector(selectTodayFoods);

    const foods = allFoodsFromDB.filter(f=>f.foodMeal === meal);
    const dispatch = useDispatch();

    useEffect(()=>{
        getFoods(dispatch)
     },[]);

    return(
        <div className="diary">
            <Row>
                <Col xs='4'/>
                <Col xs='3' md='2' xl='2'>
                    <h3 className='meal-title'>{meal}</h3>
                </Col>
                <Col>
                    <Link to='/addfood' className='btn bb'
                    onClick={()=>{const newMeal={
                        mealName: meal
                    }
                    updateMeal(newMeal);}}>
                       <FontAwesomeIcon className='icon-plus' icon={faPlus}/>
                    </Link>
                </Col>
            </Row>
            
            <div className='food-diary-rows'>
            {foods.map((food)=>{
                    return(
                        <div className='food-diary-row'>
                        <Row className='food-diary-row-component'>
                <Col >
                    <p>{food.foodName}</p>
                </Col>
                <Col>
                    <p>{food.foodCal}</p>
                </Col>
                <Col xs='1'>
                   <Button className="btn btn-dark mt-2"
                   onClick={()=>{
                    console.log("deleting food...")
                    deleteFood(food._id)
                    window.location.reload();
                    }}>Delete</Button>
                </Col>
                <Col xs='1'>
                <Link to={`editfood/${food._id}`} 
                className="btn btn-dark mt-2"
                onClick={()=>dispatch(setSelectedFood(food))}>
                            Edit
                </Link>
                </Col>
            </Row>
            <Row className="diary-sub-heading food-diary-row-component">
                <Col xs='5'>
                    <p>Food</p>
                </Col>
                <Col xs='3'>
                    <p>Calories</p>
                </Col>
                
            </Row>
            </div>
                    )})}
                    </div>
           
        
           </div>
        
    )


}

export default Diary;