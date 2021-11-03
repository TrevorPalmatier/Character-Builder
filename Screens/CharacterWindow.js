import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, Alert, ScrollView, StatusBar } from "react-native";
import { Camera } from "expo-camera";
import { auth, firestore } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectUID, setUserLogOutState } from "../redux/features/userSlice";

import textStyles from "../styles/TextStyles";
import StatBox from "../components/StatBox";
import { selectCharacter, selectID } from "../redux/features/characterSlice";
import SavingThrow from "../components/SavingThrow";

function CharacterWindow(props) {
	const [hasPermissions, setHasPermission] = useState(null);
	const [character, setCharacter] = useState(useSelector(selectCharacter));
	const dispatch = useDispatch();
	const id = useSelector(selectID);
	const uid = useSelector(selectUID);

	const useCamera = async () => {
		if (hasPermissions !== true) {
			const { status } = await Camera.requestCameraPermissionsAsync();
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

	const handleUpdateCharacter = (index, value) => {
		const newStats = [...character.stats];
		newStats[index] = value;
		const newChar = { name: character.name, stats: newStats };
		setCharacter(newChar);
		firestore.collection("users").doc(uid).collection("characters").doc(id).update(newChar);
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

	return (
		<View style={styles.main}>
			<ScrollView contentContainerStyle={[styles.container]} bounces={false}>
				<Text style={textStyles.mainText}>Hello {character.name}!</Text>
				<View style={styles.statContainer}>
					<StatBox name='STR' num={character.stats[0]} index={0} update={handleUpdateCharacter} />
					<StatBox name='DEX' num={character.stats[1]} index={1} update={handleUpdateCharacter} />
					<StatBox name='CON' num={character.stats[2]} index={2} update={handleUpdateCharacter} />
					<StatBox name='INT' num={character.stats[3]} index={3} update={handleUpdateCharacter} />
					<StatBox name='WIS' num={character.stats[4]} index={4} update={handleUpdateCharacter} />
					<StatBox name='CHA' num={character.stats[5]} index={5} update={handleUpdateCharacter} />
				</View>
				<View style={styles.savingThrowContainer}>
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
					<SavingThrow />
				</View>
				<View>
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
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		width: "100%",
		height: "100%",
		backgroundColor: "#404040",
		paddingTop: StatusBar.currentHeight,
	},
	container: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#404040",
		alignItems: "center",
		width: "100%",
		height: "100%",
	},
	statContainer: {
		width: "100%",
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		paddingBottom: 10,
		borderBottomColor: "gray",
		borderBottomWidth: 1,
	},
	savingThrowContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
		paddingBottom: 10,
	},
});

export default CharacterWindow;
