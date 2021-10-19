import { createSlice } from "@reduxjs/toolkit";
import firebase from "firebase";

export const signedInSlice = createSlice({
	name: "signedIn",
	initialState: {
		currentUser: null,
		userData: { email: "", name: "" },
	},
	reducers: {
		signedIn: (state) => {
			const user = firebase.auth().currentUser;
			firebase
				.firestore()
				.collection("users")
				.doc(user.uid)
				.get()
				.then((snapshot) => {
					console.log(snapshot.data());
					if (snapshot.exists) {
						state.userData = snapshot.data();
					}
				});
			state.currentUser = user;
		},
	},
});

export const { signedIn } = signedInSlice.actions;

export default signedInSlice.reducer;
