import React, { useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet, Alert } from "react-native";
import { auth, firebase } from "../firebase";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../redux/features/userSlice";

function Register(props) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const onSignUp = () => {
		auth.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				let uid = result.user.uid;
				result.user.updateProfile({ displayName: name });
				firebase.firestore().collection("users").doc(uid).set({ name, email });
				dispatch(setActiveUser({ data: { name, email }, uid }));
			})
			.catch((error) => {
				Alert.alert(error);
			});
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder='name'
				placeholderTextColor='#a6a6a6'
				onChangeText={(name) => setName(name)}
			/>
			<TextInput
				style={styles.input}
				keyboardType='email-address'
				placeholder='email'
				placeholderTextColor='#a6a6a6'
				onChangeText={(email) => setEmail(email)}
			/>
			<TextInput
				style={styles.input}
				placeholder='password'
				placeholderTextColor='#a6a6a6'
				secureTextEntry={true}
				onChangeText={(pw) => setPassword(pw)}
			/>
			<Pressable
				onPress={() => {
					onSignUp();
				}}>
				<Text style={styles.button}>Register</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
		backgroundColor: "#404040",
		alignItems: "center",
	},
	input: {
		width: "80%",
		padding: 10,
		margin: 10,
		borderWidth: 1,
		borderColor: "white",
		color: "white",
	},
	button: { color: "white", fontSize: 20, paddingTop: 20 },
});

export default Register;
