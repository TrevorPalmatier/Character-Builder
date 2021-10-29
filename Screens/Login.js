import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet, Alert } from "react-native";
import { auth, firebase } from "../firebase";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../redux/features/userSlice";

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const login = () => {
		auth.signInWithEmailAndPassword(email, password)
			.then((result) => {
				firebase
					.firestore()
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
			<TextInput
				style={styles.input}
				keyboardType='email-address'
				placeholder='email'
				onChangeText={(email) => setEmail(email)}
			/>
			<TextInput
				style={styles.input}
				placeholder='password'
				secureTextEntry={true}
				onChangeText={(pw) => setPassword(pw)}
			/>
			<Button title='Log In' onPress={() => login()} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	input: {
		width: "80%",
		padding: 10,
		margin: 10,
		borderWidth: 1,
		borderColor: "black",
		color: "black",
	},
});

export default Login;
