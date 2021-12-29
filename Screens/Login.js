import React, { useState } from "react";
import { Pressable, Text, TextInput, View, StyleSheet, Alert } from "react-native";
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
				let uid = result.user.uid;
				firebase
					.firestore()
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
					login();
				}}>
				<Text style={styles.button}>Log In</Text>
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

export default Login;
