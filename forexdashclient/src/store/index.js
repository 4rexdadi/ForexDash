import { configureStore } from "@reduxjs/toolkit";
import accInfoReducer from "./accInfoSlice";
import menuReducer from "./menuSlice";

const store = configureStore({
	reducer: {
		accInfoSlice: accInfoReducer,
		menuSlice: menuReducer,
	},
});
export default store;
