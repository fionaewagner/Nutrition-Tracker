import { fillResults } from "../redux/apiSlice";
import axios from 'axios'

const url = 'http://localhost:5000/api';

export const getData = async (query, dispatch) => {
    console.log("this query is: " + query)
    try {
      const {data} = await axios.get(`${url}/${query}`);
        dispatch(fillResults(data));
    } catch (error) {
      console.log(error)
    }
}

