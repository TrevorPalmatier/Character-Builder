import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, Alert } from "react-native";
import { Camera } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUserName, setUserLogOutState } from "../redux/features/userSlice";

import textStyles from "../styles/TextStyles";
import StatBox from "../components/StatBox";

function CharacterWindow(props) {
	const [hasPermissions, setHasPermission] = useState(null);
	const dispatch = useDispatch();
	const userName = useSelector(selectUserName);

	// useEffect(() => {
	// 	dispatch(updateUser());
	// });

	const useCamera = async () => {
		if (hasPermissions !== true) {
			const { status } = await Camera.requestCameraPermissionsAsync();
			console.log(status);
			setHasPermission(status === "granted");
			if (status === "granted") {
				props.navigation.navigate("Camera");
			} else {
				Alert.alert("Camera permissions were not granted");
			}
		} else {
			props.navigation.navigate("Camera");
		}
	};

	const signOut = () => {
		auth.signOut()
			.then(() => {
				console.log("User Signed Out");
				dispatch(setUserLogOutState());
			})
			.catch((error) => {
				Alert.alert(error);
			});
	};

	if (userName === "") {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	} else {
		return (
			<View style={styles.main}>
				<View style={[styles.container]}>
					<Text style={textStyles.mainText}>Hello {userName}!</Text>
					<View style={styles.statContainer}>
						<StatBox name='STR' num='13' />
						<StatBox name='DEX' num='13' />
						<StatBox name='CON' num='15' />
						<StatBox name='INT' num='12' />
						<StatBox name='WIS' num='9' />
						<StatBox name='CHA' num='7' />
					</View>
					<View style={styles.buttonContainer}>
						<Button
							title='Take Picture'
							onPress={() => {
								useCamera();
							}}
						/>
						<Button
							title='Sign Out'
							onPress={() => {
								signOut();
							}}
						/>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	container: {
		paddingTop: 60,
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#404040",
		alignItems: "center",
		justifyContent: "space-around",
		width: "100%",
		height: "100%",
	},
	statContainer: {
		flex: 1,
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
	},
	buttonContainer: {
		flex: 1,
	},
});

export default CharacterWindow;
