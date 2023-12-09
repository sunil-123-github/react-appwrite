import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";

const store = configureStore({
    reducer: {
        authSlice: authSlice.reducer,
    }
});


export default store;
