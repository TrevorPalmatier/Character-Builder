import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { selectCharacter } from "../redux/features/characterSlice";

export default function HealthTracker({ press }) {
	const character = useSelector(selectCharacter);
	const nums = [];
	for (let i = 100; i > 0; i--) {
		nums.push(i.toString());
	}

	return (
		<View>
			<Pressable style={styles.main} onPress={() => press(nums)}>
				<Text style={styles.numText}>
					{character.health}/{character.maxHealth}
				</Text>
				<Text style={styles.hitText}>HIT POINTS</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		flexDirection: "column",
		width: 90,
		height: 35,
		backgroundColor: "#1aa3ff",
		marginBottom: 5,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	hitText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 11,
	},
	numText: {
		color: "white",
		fontWeight: "normal",
		fontSize: 13,
	},
});
