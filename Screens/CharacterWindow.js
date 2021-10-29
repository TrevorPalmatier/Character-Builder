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
	const { character } = props.route.params;

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

	if (userName === null) {
		return (
			<View style={styles.main}>
				<Text style={textStyles.mainText}>Loading...</Text>
			</View>
		);
	} else {
		return (
			<View style={styles.main}>
				<View style={[styles.container]}>
					<Text style={textStyles.mainText}>Hello {character.name}!</Text>
					<View style={styles.statContainer}>
						<StatBox name='STR' num={character.str} />
						<StatBox name='DEX' num={character.dex} />
						<StatBox name='CON' num={character.con} />
						<StatBox name='INT' num={character.int} />
						<StatBox name='WIS' num={character.wis} />
						<StatBox name='CHA' num={character.cha} />
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
