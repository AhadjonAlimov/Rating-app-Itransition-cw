import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/userReducer';
import reviewReducer from './reducers/reviewReducer';
import reviewPageReducer from './reducers/reviewPageReducer';


export const store = configureStore({
    reducer: { authReducer, reviewReducer, reviewPageReducer },
    devTools: process.env.NODE_ENV !== "production"
})