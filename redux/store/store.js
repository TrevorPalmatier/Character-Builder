import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import characterReducer from "../features/characterSlice";

export default configureStore({
	reducer: {
		user: userReducer,
		character: characterReducer,
	},
});
