import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../fetures/BlogSlice"

const  store = configureStore({
    reducer:{
        blogs: blogReducer
    }
})

export default store