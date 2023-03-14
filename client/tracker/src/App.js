import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Redirect, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './view/pages/HomePage/HomePage';
import Header from './view/Header/Header';
import AddFood from './view/pages/AddFood/AddFood';
import FoodView from './view/pages/FoodView/FoodView';
import FoodEditView from './view/pages/FoodEditView/FoodEditView';
import LoginPage from './view/pages/AuthPages/LoginPage/LoginPage';
import { Navigate } from 'react-router-dom';
import RegisterPage from './view/pages/AuthPages/RegisterPage/RegisterPage';
import TrendsPage from './view/pages/TrendsPage/TrendsPage';
import ProfilePage from './view/pages/ProfilePage/ProfilePage';
import { useState } from 'react';


function App() {
  const token = sessionStorage.getItem("authToken")

  
  if(token){
    console.log("token found!")
  }
  
  return (
   
      <div >
        
        <Routes>
          <Route path='/' element={<LoginPage/>} />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='addfood' element={token?<AddFood/> : <Navigate to="/" />}/>
          <Route path="addfood/:foodId" element={token?<FoodView/> : <Navigate to="/" />}/>
          <Route path="editfood/:foodId" element={token?<FoodEditView/> : <Navigate to="/" />}/>
          <Route path="/trends" element={token?<TrendsPage/> : <Navigate to="/" />}/>
          <Route path="/profile" element={token?<ProfilePage/> : <Navigate to="/" />}/>
      </Routes>
        
      </div>
   
    
  );
}

export default App;
