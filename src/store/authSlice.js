// Redux toolkit se createSlice import kar rahe hain
import { createSlice } from "@reduxjs/toolkit";

// Initial state define kar rahe hain
// By default user login nahi hota (status: false) aur koi user data nahi hota
const initialState = {
    status: false,
    userData: null
}

// authSlice ek slice hai jo authentication (login/logout) handle karega
// Ye check karta hai user authenticated hai ya nahi
const authSlice = createSlice({
    name: "auth", // slice ka naam
    initialState, // initial state assign kar rahe hain
    reducers: { 
        // Login function: jab user login karta hai
        login: (state, action) => {
            state.status = true;               // user ab authenticated hai
            state.userData = action.payload;   // user ka data store kar rahe hain
        },
        // Logout function: jab user logout karta hai
        logout: (state) => {
            state.status = false;  // user ab logout ho gaya
            state.userData = null; // user ka data hata diya
        }
    }
})

// Actions (login aur logout) export kar rahe hain taaki components me use kar sakein
export const { login, logout } = authSlice.actions;

// Reducer ko export kar rahe hain taaki store.js me use ho sake
export default authSlice.reducer;
