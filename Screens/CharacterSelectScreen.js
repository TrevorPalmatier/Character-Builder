import React, { useEffect, useState } from "react";
import { firestore, auth } from "../firebase";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { FlatList } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/core";
import textStyles from "../styles/TextStyles";
import CharacterCard from "../components/CharacterCard";
import { setActiveCharacter } from "../redux/features/characterSlice";

export default function CharacterSelectScreen(props) {
	const [characters, setCharacters] = useState([]);

	const dispatch = useDispatch();

	useFocusEffect(
		React.useCallback(() => {
			console.log("hit");
			firestore
				.collection("users")
				.doc(auth.currentUser.uid)
				.collection("characters")
				.get()
				.then((snapshot) => {
					setCharacters(snapshot.docs);
				})
				.catch((error) => {
					console.log(error);
				});
		}, [])
	);

	const handleSelectCharacter = (index) => {
		let character = characters[index];
		// console.log(character.data());
		dispatch(setActiveCharacter({ data: character.data(), id: character.id }));
		props.navigation.navigate("CharacterPage");
	};

	const handleDeleteCharacter = (index) => {
		firestore
			.collection("users")
			.doc(auth.currentUser.uid)
			.collection("characters")
			.doc(characters[index].id)
			.delete()
			.then(() => {
				let charactersCopy = [...characters];
				charactersCopy.splice(index, 1);
				setCharacters(charactersCopy);
			});
	};

	const handleNewCharacter = () => {
		props.navigation.navigate("CharacterCreation");
	};

	const renderItem = ({ item, index }) => {
		return (
			<CharacterCard
				key={item.id}
				index={index}
				name={item.data().name}
				select={handleSelectCharacter}
				delete={handleDeleteCharacter}
			/>
		);
	};

	return (
		<View style={styles.main}>
			{/* <ScrollView
				style={{ width: "100%", backgroundColor: "#404040" }}
				contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}>
				{characters.map((character, index) => {
					return (
						<CharacterCard
							key={character.id}
							index={index}
							name={character.data().name}
							select={selectCharacter}
						/>
					);
				})}
			</ScrollView> */}
			<FlatList
				ItemSeparatorComponent={Platform.OS !== "android" && (() => <View style={[styles.separator]} />)}
				style={{ width: "100%", backgroundColor: "#404040" }}
				// contentContainerStyle={styles.container}
				showsVerticalScrollIndicator={false}
				data={characters}
				renderItem={renderItem}
			/>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.button}
					onPress={() => {
						handleNewCharacter();
					}}>
					<Text style={textStyles.mainText}> New Character</Text>
				</TouchableOpacity>
			</View>
		</View>
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
	buttonContainer: {
		width: "100%",
		height: 110,
		alignItems: "center",
		borderTopColor: "#666",
		borderTopWidth: 1,
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		width: "90%",
		height: 60,
		backgroundColor: "#29293d",
		margin: 10,
		borderRadius: 4,
	},
	separator: {
		borderBottomColor: "#666",
		borderBottomWidth: 1,
	},
});
