import { configureStore } from '@reduxjs/toolkit';
import { apiReducer } from '../controller/redux/apiSlice';
import { authReducer } from '../controller/redux/authSlice';
import { diaryReducer } from '../controller/redux/diarySlice';




export const store = configureStore({
  reducer: {
    diary: diaryReducer,
    auth: authReducer,
    api: apiReducer
  },
});
