// Redux toolkit se configureStore import kar rahe hain
import { configureStore } from "@reduxjs/toolkit";

// authSlice ko import kar rahe hain (ye reducer provide karega)
import authReducer from "./authSlice";

// Store create kar rahe hain
const store = configureStore({
    reducer: {
        auth: authReducer, // yahan hum apna slice add kar rahe hain
        // post : postSlice,  todo 
    },
});

export default store;
