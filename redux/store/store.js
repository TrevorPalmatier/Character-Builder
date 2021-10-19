import { configureStore } from "@reduxjs/toolkit";
import signedInReducer from "../features/signedIn";
import userReducer from "../features/user";

export default configureStore({
	reducer: {
		signedIn: signedInReducer,
		user: userReducer,
	},
});
