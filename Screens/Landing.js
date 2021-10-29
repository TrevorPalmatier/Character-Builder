import React from "react";
import { firestore, auth } from "../firebase";
import { View, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../redux/features/userSlice";

function Landing(props) {
	const dispatch = useDispatch();

	const cheat = () => {
		auth.signInWithEmailAndPassword("tsp@gmail.com", "qwerty")
			.then((result) => {
				firestore
					.collection("users")
					.doc(result.user.uid)
					.get()
					.then((snapshot) => {
						if (snapshot.exists) {
							dispatch(setActiveUser(snapshot.data()));
						}
					});
			})
			.catch((error) => {
				Alert.alert(error);
			});
	};

	return (
		<View style={styles.container}>
			<Button
				title='Register'
				onPress={() => {
					props.navigation.navigate("Register");
				}}
			/>
			<Button
				title='Log In'
				onPress={() => {
					props.navigation.navigate("Login");
				}}
			/>
			<Button
				title='Cheat'
				onPress={() => {
					cheat();
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Landing;
