import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SavingThrow() {
	return (
		<View style={styles.savingBox}>
			<Text style={styles.titleText}>Strength</Text>
			<View style={styles.numBox}>
				<Text style={styles.numText}>-4</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	savingBox: {
		flexDirection: "row",
		width: "45%",
		height: 60,
		borderColor: "white",
		borderWidth: 2,
		borderRadius: 5,
		backgroundColor: "#29293d",
		justifyContent: "space-between",
		alignItems: "center",
		paddingLeft: 10,
		paddingRight: 10,
		marginTop: 15,
	},
	numBox: {
		borderColor: "white",
		borderWidth: 1.25,
		borderRadius: 5,
		height: 35,
		width: 35,
		justifyContent: "center",
		alignItems: "center",
		padding: 5,
	},
	titleText: {
		color: "white",
		fontSize: 20,
	},
	numText: {
		color: "white",
		fontSize: 16,
	},
});
