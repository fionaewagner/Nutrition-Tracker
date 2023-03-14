import { Button, Card, Col, Row } from "reactstrap"
import {
  
    faMessage,
    faAddressBook,
    faRectangleList,
    faEnvelope
   
    
  } from "@fortawesome/free-solid-svg-icons";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from "../../../../controller/redux/authSlice";
import { register } from "../../../../controller/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateRegister } from "../../../../controller/utils/validateRegister";





const RegisterPage=()=>{

    const dispatch = useDispatch();

    const [openTab, setOpenTab] = useState(0);

    const navigate = useNavigate();

    

    const handleRegister=(values)=>{
        const height = ((values.feet * 30.48) + (values.inches * 2.54));
        const finalWeight = values.weight * 0.453592
        let bmr = 0;
        let calories = 0;
        const age = 20;
        
        if(values.sex === 'male'){
            bmr = 66.5 + (13.75 * finalWeight) 
            + (5.003 * height) 
            - (6.75 * age)
        }else{
            bmr = 655.1 + (9.563 * finalWeight) 
            + (1.850 * height) 
            - (4.676 * age)
        }

        if(values.activity === 'sedentary'){
            calories = bmr * 1.2
        }else if(values.activity === 'moderate'){
            calories = bmr * 1.55
        }else if(values.activity === 'vigorous'){
            calories = bmr * 1.725
        };
        const currentUser={
            username: values.username,
            email: values.email,
            password: values.password,
            weight: values.weight,
            height: height,
            sex: values.sex,
            activity: values.activity,
            calories: calories
        };
        console.log(currentUser);
        //register(currentUser, navigate);
        //dispatch(registerUser(currentUser));

}

    
    return(
        <div className="auth-page">
        <div className='auth-title'>
            <h1 className="register-lg-txt">Vita</h1>
            <h3>Register</h3>
        </div>
        <Row>
            <Col/>
            <Col xs='12' lg='7'>
                <div className="register-card">
                    <Formik
                    initialValues={{email:'',username:'',password:'', weight: 0, feet: 0, inches: 0, sex: '', activity:''}}
                    onSubmit={handleRegister}
                    validate={validateRegister}> 
                        <div className="auth-form">
                            <Form>
                                <Row className="text-center"> 
                                    <Col/>
                                    <Col xs='3'>
                                        <p className="color-tan add-underline">Your Information</p>
                                    </Col>
                                    <Col/>
                                </Row>
                               
                                <Row className="mb-2 profile-row"> 
                                    
                                    <Col xs='12' sm='4'>
                                        <Field type='email' placeholder='Email'
                                        name='email' id='email'/>
                                         <ErrorMessage name="email">
                                            {(msg)=><p className='text-danger errm'>{msg}</p>}
                                        </ErrorMessage>
                                    </Col>
                                    <Col sm='4'>
                                        <Field type='text' placeholder='Username'
                                        name='username' id='username'/>
                                        <ErrorMessage className="errm" name="username">
                                            {(msg)=><p className='text-danger errm'>{msg}</p>}
                                        </ErrorMessage>
                                    </Col>
                                    <Col sm='4'>
                                         
                                        <Field type='password' placeholder='Password'
                                        name='password' id='password'/>
                                        <ErrorMessage name="password">
                                            {(msg)=><p className='text-danger errm'>{msg}</p>}
                                        </ErrorMessage>
                                    </Col>
                                </Row>
                                
                                <Row className="text-center"> 
                                    <Col />
                                    <Col>
                                        <p className="color-tan add-underline">Weight & Height</p>
                                    </Col>
                                    <Col />
                                </Row>
                                <Row>
                                    
                                    
                                    
                                </Row>
                                <Row className="profile-row">
                                   
                                    <Col>
                                    <Field type='number' className='inch-foot' placeholder='0'
                                        name='weight' id='weight' />
                                    <label for='weight'>lbs</label>
                                    <ErrorMessage name="weight">
                                            {(msg)=><p className='text-danger errm'>{msg}</p>}
                                    </ErrorMessage>
                                    </Col>
                                   
                                    
                                    <Col xs='3'>
                                    <Field className='inch-foot' type='number' placeholder='0'
                                        name='feet' id='feet' />
                                        <label for='feet'>Feet</label>
                                        <ErrorMessage name="feet">
                                            {(msg)=><p className='text-danger errm'>{msg}</p>}
                                    </ErrorMessage>
                                    </Col>
                                    <Col xs='3'>
                                    <Field type='number' className='inch-foot' placeholder='0'
                                        name='inches' id='inches'/>
                                        <label for='inches'>Inches</label>
                                        <ErrorMessage name="inches">
                                            {(msg)=><p className='text-danger errm'>{msg}</p>}
                                    </ErrorMessage>
                                    </Col>
                                </Row>
                
                                <Row className="text-center ">
                                    <Col/>
                                    <Col xs='2'>
                                        <p className="color-tan add-underline">Sex</p>
                                        <ErrorMessage name="sex">
                                            {(msg)=><p className='text-danger'>{msg}</p>}
                                        </ErrorMessage>
                                    </Col>
                                    <Col/>
                                </Row>
                                <Row className="profile-row text-center">
                                    
                                   <Col/>
                                    <Col xs='2'>    
                                        <label for='regfemale' className="form-control" >
                                            <Field className='field-lbl' type="radio" name="sex" value="female" id='regfemale' />
                                        Female</label>
                                    </Col>
                                    <Col xs='2'/>
                                    <Col xs='2'>
                                        <label for='regmale' className="form-control" >
                                            <Field type="radio" name="sex" value="male" id='regmale'/>
                                        Male</label>
                                    </Col>
                                    <Col />    
                                </Row>
                                
                
                                <Row className="text-center ">
                                    <Col/>
                                    <Col xs='2'>
                                        <p className="color-tan add-underline">Activity</p>
                                    </Col>
                                    <Col/> 
                                </Row>
                                <Row>
                                    <ErrorMessage name="activity">
                                            {(msg)=><p className='text-danger'>{msg}</p>}
                                    </ErrorMessage>
                                </Row>
                                <Row className="profile-row mb-2">
                                    <div role="group">
                                        <Row>
                                            <Col/>
                                            <Col xs='3'>
                                                <label className="form-control ai">
                                                <Field id='registermod' type="radio" name="activity" value="sedentary" />
                                                    Sedentary
                                                </label>
                                                <p>No activity or exercise <br/> throughout the day</p>
                                            </Col>
                                            <Col xs='3'>
                                                <label className="form-control">
                                                <Field id='registermod'  type="radio" name="activity" value="moderate" />
                                                Moderate
                                                </label>
                                                <p>Light activity or exercise <br/> throughout the day</p>
                                            </Col>
                                            <Col xs='3'>
                                                <label className="form-control">
                                                <Field id='registervig' type="radio" name="activity" value="vigorous" />
                                                    Vigorous
                                                </label>
                                                <p>Vigorous activity or exercise throughout the day</p>
                                            </Col>
                                            <Col/>
                                        </Row>
                                    </div>
                                </Row>
                                
                                
                                <Row>
                                    <Col className="mt-3">
                                        <Button type="submit">Create New Account</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        
                    </Formik>
                

                </div>
                <Row>
                    <Col xs='5'/>
                    <Col className="auth-links-text">
                        <Link to='/' className="auth-links-text">Log in</Link>
                    </Col>
                    <Col xs='5'/>
                </Row>
            </Col>
            
            <Col/>
        </Row>    
        </div>
    )
}

export default RegisterPage