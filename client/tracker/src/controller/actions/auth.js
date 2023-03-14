import axios from 'axios'
import { useSelector } from 'react-redux';
import { selectUser, setName, setUser } from '../redux/authSlice';
import { registerUser } from '../redux/authSlice';

const url = 'http://localhost:5000/auth';

export const register=async(user, navigate, dispatch)=>{

  
  const {username,
    email,
    password,
    weight,
    height,
    sex,
    activity,
  calories} = user;

    try {
        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

        const {data} = await axios.post( `${url}/register`,
        {
          username,
          email,
          password,
          weight,
          height,
          sex,
          activity,
          calories
        },
        config
      );

      if(data){
      sessionStorage.setItem("authToken", data.token);
      navigate("../", { replace: true });
      setTimeout(() => {
        console.log("Delayed!");
        window.location.reload();
      }, 500)
      dispatch(setUser(email))
      dispatch(setName(username))
      }
      else{
        console.log("Invalid Credentials")
      } 
    } catch (error) {
      console.log(error)
        
    }

}

export const updateUser = async (_id, user) => {
  console.log("this id is: " + _id)
  try {
    axios.patch(`${url}/${_id}`, user);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUser = async (_id, dispatch) => {
  console.log("this id is: " + _id)
  try {
    const data  = await axios.get(`${url}/${_id}`);
    dispatch(registerUser(data.data))
  } catch (error) {
    console.log(error);
  }
};



export const login=async(user, navigate, dispatch)=>{
  const {email, password} = user;

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.post(
      `${url}/login`,
      { email, password },
      config
    );

    if(data){
      console.log("data is" + data._id)
      sessionStorage.setItem("authToken", data.token);
      sessionStorage.setItem("userId", data._id)
      navigate("../home", { replace: true })
      setTimeout(() => {
        console.log("Delayed!");
        window.location.reload();
      }, 500)
      }
      else{
        console.log("Invalid Credentials")
      }

  } catch (error) {
    console.log(error)
  }
};



export const signOff=async()=>{
  
}