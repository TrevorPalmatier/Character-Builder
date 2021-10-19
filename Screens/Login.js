import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet } from "react-native";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { signedIn } from "../redux/features/signedIn";
import { updateUser } from "../redux/features/user";

function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const login = () => {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((result) => {
				dispatch(signedIn());
				// dispatch(updateUser());
			})
			.catch((error) => {
				console.log(error);
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
