import { Button, Card, Col, Container, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
  faSpinner,
  
 
  
} from "@fortawesome/free-solid-svg-icons";
import './ProfilePage.css'
import { useEffect, useState } from "react";
import { getUser, updateUser } from "../../../controller/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../controller/redux/authSlice";
import Header from "../../Header/Header";

const ProfilePage = ()=>{

    const dispatch = useDispatch();

    useEffect(()=>{
        getUser(sessionStorage.getItem("userId"), dispatch)
     },[]);

    
    const user = useSelector(selectUser);
    
    const userId = user._id;
    const username = user.username;
    const displayUsername = username.charAt(0).toUpperCase() + username.slice(1);
    const startWeight = user.weight;
    const startHeight = user.height;
    const startFeet = Math.floor((startHeight * 0.393701) / 12);
    const startInch = Math.floor((startHeight * 0.393701) % 12);
   
    
    const startSex = user.sex ;
    const startActivity = user.activity;

    console.log(user);

    const [sex, setSex] = useState(startSex);
    const [weight, setWeight] = useState(startWeight);
    const [feet, setFeet] = useState(startFeet);
    const [inch, setInch] = useState(startInch);
    const [activity, setActivity] = useState(startActivity);
    const [age, setAge]= useState("");

    const onActivityChange=(e)=>{
        setActivity(e.target.value);
    }
    const onSexChange=(e)=>{
        console.log(sex)
        setSex(e.target.value);
    }
    const onWeightChange=(e)=>{
        setWeight(e.target.value);
    }
    const onFeetChange=(e)=>{
        setFeet(e.target.value);
    }
    const onInchChange=(e)=>{
        setInch(e.target.value);
    }

    const handleSave=()=>{
        //calculate calories based on Harris-Benedict equation
        const height = ((feet * 30.48) + (inch * 2.54));
        const finalWeight = weight * 0.453592
        let bmr = 0;
        let calories = 0;
        
        if(sex === 'male'){
            bmr = 66.5 + (13.75 * finalWeight) 
            + (5.003 * height) 
            - (6.75 * age)
        }else{
            bmr = 655.1 + (9.563 * finalWeight) 
            + (1.850 * height) 
            - (4.676 * age)
        }

        if(activity === 'sedentary'){
            calories = bmr * 1.2
        }else if(activity === 'moderate'){
            calories = bmr * 1.55
        }else if(activity === 'vigorous'){
            calories = bmr * 1.725
        };

        const updatedUser = {
            weight,
            height,
            sex,
            activity,
            calories
        };

        console.log("updating user... " + updatedUser)

        updateUser(userId,updatedUser);

    }
    
    return(
        <>
            <Header/>
       
        <Container>
            <Card className="profile-card text-center">
                <Row className="profile-row">
                   <h1 className="color-tan">Welcome Back, <br/> {displayUsername}</h1> 
                </Row>
                <Row className="text-center mb-3"> 
                    <Col>
                        <h1 className="color-tan">Weight</h1>
                    </Col>
                    <Col>
                        <h1 className="color-tan">Height</h1>
                    </Col>
                </Row>
                <Row className="profile-row">
                    
                    <Col>
                       <input className="inch-foot text-center" 
                       onChange={(e)=>onWeightChange(e)} 
                       type='number' value={weight}
                       />
                    </Col>
                    
                    <Col xs='3'>
                       <input id='feet'  
                       onChange={(e)=>onFeetChange(e)}
                       className='inch-foot text-center' 
                       type='number' value={feet}/>
                       <label for='feet'>Feet</label>
                    </Col>
                    <Col xs='3'>
                       <input id='inch' 
                       onChange={(e)=>onInchChange(e)}
                       className='inch-foot text-center' 
                       type='number' value={inch}/>
                       <label for='inch'>Inch</label>
                    </Col>
                </Row>
                
                <Row className="text-center mb-3">
                    <Col>
                        <h1 className="color-tan">Sex</h1>
                    </Col>

                </Row>
                <Row className="profile-row">
                    <Col/>
                     <Col className="form" >
                         <label for='male' className="form-control ">
                            <input id="male" checked={sex === 'male'} value='male' onChange={(e)=>onSexChange(e)}
                            className="radio-active"name="sex" type='radio'/>Male</label>
                        
                     </Col>
                     
                     <Col className="form">
                         <label for='female' className="form-control">
                            <input id="female" checked={sex === 'female'} value='female' onChange={(e)=>onSexChange(e)}
                            className="radio-active" name="sex" type='radio'/>Female</label>
                         
                     </Col> 
                     <Col/>
                </Row>
                
                <Row className="text-center mb-3">
                    <Col>
                        <h1 className="color-tan">Activity</h1>
                    </Col>

                </Row>
                <Row className="profile-row">
                    <Col xs='0' sm='1'/>
                     
                    <Col className="form" >
                        <label for='sedentary' className="form-control ">
                            <input onChange={(e)=>onActivityChange(e)} 
                            value="sedentary" id="sedentary" 
                            className="radio-active"name="activity" 
                            checked={activity === 'sedentary'} type='radio'/>
                                Sedentary
                            </label>
                        <p>Little to no activity or <br/> exercise throughout the day.</p>
                    </Col>
                    
                    <Col className="form">
                        <label for='moda' className="form-control">
                            <input onChange={(e)=>onActivityChange(e)} value='moderate'
                            id="moda" className="radio-active"
                            name="activity" type='radio'
                            checked={activity === 'moderate'}/>Moderate</label>
                        <p>Light activity or exercise <br/>throughout the day.</p>
                    </Col>
                    <Col className="form">
                        <label for='verya' className="form-control">
                            <input onChange={(e)=>onActivityChange(e)} value='vigorous'
                            id="verya" className="radio-active"
                            name="activity" type='radio'
                            checked={activity === 'vigorous'}/>Vigorous</label>
                        <p>Vigorous activity or exercise <br/>throughout the day.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={()=>handleSave()}>
                            Save
                        </Button>
                    </Col>
                    
                </Row>
                
                
            </Card>
        </Container> 
        </>
    )

}

export default ProfilePage