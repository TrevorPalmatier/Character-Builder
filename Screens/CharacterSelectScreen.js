import React, { useEffect, useState } from "react";
import { firestore, auth } from "../firebase";
import { View, Text, StyleSheet } from "react-native";
import textStyles from "../styles/TextStyles";
import CharacterCard from "../components/CharacterCard";

export default function CharacterSelectScreen(props) {
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		firestore
			.collection("users")
			.doc(auth.currentUser.uid)
			.collection("characters")
			.get()
			.then((snapshot) => {
				const thing = snapshot.docs;
				setCharacters(thing);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const selectCharacter = (index) => {
		props.navigation.navigate("CharacterPage", {
			character: characters[index].data(),
		});
	};

	return (
		<View style={styles.main}>
			<View style={styles.container}>
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
	},
	container: {
		paddingTop: 60,
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#404040",
		alignItems: "center",
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
