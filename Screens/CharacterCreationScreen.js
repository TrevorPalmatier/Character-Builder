import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from "react-native";
import { auth, firestore } from "../firebase";
import textStyles from "../styles/TextStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StackActions } from "@react-navigation/routers";
import { useDispatch, useSelector } from "react-redux";
import { selectUID } from "../redux/features/userSlice";

export default function CharacterCreationScreen(props) {
	const [statValues, setStatValues] = useState([-1, -1, -1, -1, -1, -1]);
	const [characterName, setCharacterName] = useState("");
	const dispatch = useDispatch();
	const uid = useSelector(selectUID);
	const skills = [
		{ key: 0, name: "Acrobatics", prof: 0, stat: 1 },
		{ key: 1, name: "Animal Handling", prof: 0, stat: 4 },
		{ key: 2, name: "Arcana", prof: 0, stat: 3 },
		{ key: 3, name: "Athletics", prof: 0, stat: 0 },
		{ key: 4, name: "Deception", prof: 0, stat: 5 },
		{ key: 5, name: "History", prof: 0, stat: 3 },
		{ key: 6, name: "Insight", prof: 0, stat: 4 },
		{ key: 7, name: "Intimidation", prof: 0, stat: 5 },
		{ key: 8, name: "Investigation", prof: 0, stat: 3 },
		{ key: 9, name: "Medicine", prof: 0, stat: 4 },
		{ key: 10, name: "Nature", prof: 0, stat: 3 },
		{ key: 11, name: "Perception", prof: 0, stat: 4 },
		{ key: 12, name: "Performance", prof: 0, stat: 5 },
		{ key: 13, name: "Persuasion", prof: 0, stat: 5 },
		{ key: 14, name: "Religion", prof: 0, stat: 4 },
		{ key: 15, name: "Sleight of Hand", prof: 0, stat: 1 },
		{ key: 16, name: "Stealth", prof: 0, stat: 1 },
		{ key: 17, name: "Survival", prof: 0, stat: 4 },
	];

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
		console.log("through");

		const character = { name: characterName, stats: statValues, skills };

		console.log(character);

		firestore
			.collection("users")
			.doc(uid)
			.collection("characters")
			.add({ name: characterName, stats: statValues, skills: skills })
			.then((result) => {
				console.log("added");
				result
					.get()
					.then((snapshot) => {
						dispatch(setActiveCharacter({ data: snapshot.data(), id: snapshot.id }));
						console.log("reeeee");
						props.navigation.dispatch(StackActions.replace("CharacterPage"));
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
						<Text style={textStyles.mainText}>Create Character</Text>
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
