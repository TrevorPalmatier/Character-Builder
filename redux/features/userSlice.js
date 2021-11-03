import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userName: null,
	userEmail: null,
	uid: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setActiveUser: (state, action) => {
			state.userName = action.payload.data.name;
			state.userEmail = action.payload.data.email;
			state.uid = action.payload.uid;
		},
		setUserLogOutState: (state) => {
			state.userName = null;
			state.userEmail = null;
			state.uid = null;
		},
	},
});

export const { setActiveUser, setUserLogOutState } = userSlice.actions;

export const selectUserName = (state) => state.user.userName;
export const selectUserEmail = (state) => state.user.userEmail;
export const selectUID = (state) => state.user.uid;

export default userSlice.reducer;
