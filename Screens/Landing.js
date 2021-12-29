import React from "react";
import { firestore, auth } from "../firebase";
import { View, Button, StyleSheet, Text, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../redux/features/userSlice";

function Landing(props) {
	const dispatch = useDispatch();

	const cheat = () => {
		auth.signInWithEmailAndPassword("tsp@gmail.com", "qwerty")
			.then((result) => {
				let uid = result.user.uid;
				firestore
					.collection("users")
					.doc(uid)
					.get()
					.then((snapshot) => {
						if (snapshot.exists) {
							dispatch(setActiveUser({ data: snapshot.data(), uid }));
						}
					});
			})
			.catch((error) => {
				Alert.alert(error);
			});
	};

	return (
		<View style={styles.container}>
			<View style={{ marginBottom: 50, justifyContent: "center", alignItems: "center" }}>
				<Text style={{ color: "white", fontSize: 30, textAlign: "center", fontWeight: "500" }}>
					Welcome to the Character Foundry!
				</Text>
			</View>
			<View style={{ alignItems: "center", justifyContent: "center" }}>
				<View style={styles.padding}>
					<Pressable
						onPress={() => {
							props.navigation.navigate("Register");
						}}>
						<Text style={styles.button}>Register</Text>
					</Pressable>
				</View>
				<View style={styles.padding}>
					<Pressable
						onPress={() => {
							props.navigation.navigate("Login");
						}}>
						<Text style={styles.button}>Log In</Text>
					</Pressable>
				</View>
				{/* <View style={styles.padding}>
					<Pressable
						onPress={() => {
							cheat();
						}}>
						<Text style={styles.button}>Cheat</Text>
					</Pressable>
				</View> */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#404040",
		alignItems: "center",
		justifyContent: "space-evenly",
	},
	padding: {
		padding: 15,
	},
	button: { color: "white", fontSize: 20 },
});

export default Landing;
