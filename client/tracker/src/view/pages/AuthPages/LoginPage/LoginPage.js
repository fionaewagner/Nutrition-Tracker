import { Button, Card, Col, Row } from "reactstrap"
import {
  
    faMessage,
    faAddressBook,
    faRectangleList
   
    
  } from "@fortawesome/free-regular-svg-icons";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import '../AuthPages.css'
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from "../../../../controller/redux/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../../controller/actions/auth";




const LoginPage=()=>{

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin=(values)=>{
        const currentUser={
            email: values.email,
            password: values.password
        }
        console.log(currentUser)
        login(currentUser, navigate, dispatch)
        dispatch(signIn())
        
}
    return(
        <div className="auth-page">
        <div className='auth-title'>
            <h1 className="auth-lg-txt">Vita</h1>
            <p className="subtitle">Nutrtion Tracker</p>
            <h3>Login</h3>
        </div>
        <Row>
            <Col/>
            <Col>
                <div className="auth-card">
                    <Formik
                    initialValues={{email:'',password:'', remember:''}}
                    onSubmit={handleLogin}> 
                        <div className="auth-form">
                            <Form className="mr-1">
                                <Row className="mb-2">
                                    <Col xs='6'>
                                        <Field type='email' placeholder='Email'
                                        name='email' id='email'/>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col xs='6'>
                                        <Field type='password' placeholder='Password'
                                        name='password' id='password'/>
                                    </Col>
                                </Row>
                                
                                <Row>
                                    <Col>
                                    <Button type="submit">Sign in</Button>
                                    </Col>
                                </Row>
                                
                            </Form>
                        </div>
                        
                    </Formik>
                

                </div>
                <Row className="auth-links">
                    <Col>
                    </Col>
                    <Col xs='5' className="auth-links-text">
                        <Link to='/register' className="auth-links-text">Create Account</Link>
                    </Col>
                    <Col/>
                </Row>
            </Col>
            
            <Col/>
        </Row>    
        </div>
    )
}

export default LoginPage