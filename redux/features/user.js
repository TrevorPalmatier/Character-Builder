import { createSlice } from "@reduxjs/toolkit";
import firebase from "firebase";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		currentUser: null,
	},
	reducers: {
		updateUser: (state) => {
			state.currentUser = { name: "Trevor", email: "test@gmail.com" };
			firebase
				.firestore()
				.collection("users")
				.doc(firebase.auth.currentUser.uid)
				.get()
				.then((snapshot) => {
					console.log(snapshot.data());
					if (snapshot.exists) {
						state.currentUser = snapshot.data();
					}
				});
		},
	},
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
