import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SavingThrow(props) {
	return (
		<View style={styles.savingBox}>
			<Text style={styles.titleText}>{props.name}</Text>
			<View style={styles.numBox}>
				<Text style={styles.numText}>{Math.trunc(props.num / 2 - 5)}</Text>
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
		paddingLeft: 7,
		paddingRight: 7,
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
		backgroundColor: "#353535",
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
