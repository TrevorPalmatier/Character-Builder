import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from "react-native";
import { auth, firestore } from "../firebase";
import textStyles from "../styles/TextStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function CharacterCreationScreen(props) {
	const [statValues, setStatValues] = useState([-1, -1, -1, -1, -1, -1]);
	const [characterName, setCharacterName] = useState("");

	const statNames = ["Strength", "Dexterity", "Constitution", "Intelligence", "Wisdom", "Charisma"];

	const handleStatInput = (enteredText, index) => {
		const temp = statValues;
		if (enteredText !== "") {
			temp[index] = Number(enteredText);
			setStatValues(temp);
		} else {
			temp[index] = -1;
			setStatValues(temp);
		}
	};

	const handleCreateCharacter = () => {
		console.log("hello");
		for (const value of statValues) {
			if (value === -1) {
				Alert.alert("Please fill in all stats");
				return;
			}
		}
		if (characterName === "") {
			Alert.alert("Please fill in a character name");
			return;
		}
		// console.log("through");
		firestore
			.collection("users")
			.doc(auth.currentUser.uid)
			.collection("characters")
			.add({ name: characterName, stats: statValues })
			.then((result) => {
				result
					.get()
					.then((snapshot) => {
						props.navigation.navigate("CharacterPage", { character: snapshot.data() });
					})
					.catch((error) => {
						Alert.alert(error);
					});
			})
			.catch((error) => {
				Alert.alert(error);
			});
	};

	const handleNameInput = (enteredText) => {
		if (enteredText !== "") {
			setCharacterName(enteredText);
		}
	};

	const checkStats = () => {
		console.log(statValues);
		console.log(characterName);
	};

	return (
		<KeyboardAwareScrollView
			keyboardDismissMode='on-drag'
			bounces={false}
			contentContainerStyle={styles.main}
			style={{ backgroundColor: "#404040" }}
			resetScrollToCoords={{ x: 0, y: 0 }}
			extraScrollHeight={20}>
			<View style={styles.main}>
				<View style={styles.nameContainer}>
					<Text style={textStyles.mainText}>Name:</Text>
					<TextInput
						style={styles.input}
						placeholder='Enter Name'
						placeholderTextColor='#a6a6a6'
						keyboardAppearance='dark'
						textAlign='center'
						onChangeText={(enteredText) => {
							handleNameInput(enteredText);
						}}></TextInput>
				</View>
				<View style={styles.statContainer}>
					{statNames.map((name, index) => {
						return (
							<View key={index} style={styles.statBox}>
								<Text style={textStyles.mainText}>{name}</Text>
								<TextInput
									style={styles.input}
									maxLength={2}
									placeholder='Stat Value'
									placeholderTextColor='#a6a6a6'
									keyboardType='numeric'
									textAlign='center'
									onChangeText={(enteredText) => {
										handleStatInput(enteredText, index);
									}}
								/>
							</View>
						);
					})}
				</View>
				<View style={styles.buttonContainer}>
					<Pressable style={styles.pressable} onPress={handleCreateCharacter}>
						<Text style={textStyles.mainText}>Check Stats</Text>
					</Pressable>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	main: {
		flex: 1,
		backgroundColor: "#404040",
		width: "100%",
		height: "100%",
		alignItems: "center",
	},
	statContainer: {
		flex: 1,
		paddingTop: 20,
		flexWrap: "wrap",
		flexDirection: "row",
		justifyContent: "space-evenly",
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
	statBox: {
		backgroundColor: "#29293d",
		minWidth: 135,
		maxWidth: 140,
		minHeight: 135,
		maxHeight: 140,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "white",
		borderWidth: 2,
		padding: 10,
		marginTop: 20,
	},
	nameContainer: {
		margin: 10,
		marginBottom: 0,
		width: "90%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	buttonContainer: {
		width: "90%",
		height: 50,
		bottom: 70,
		backgroundColor: "#29293d",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
	pressable: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});
