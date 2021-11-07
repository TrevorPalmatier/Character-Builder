import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SkillBox(props) {
	const statToName = (stat) => {
		switch (stat) {
			case 0:
				return "STR";
			case 1:
				return "DEX";
			case 2:
				return "CON";
			case 3:
				return "INT";
			case 4:
				return "WIS";
			case 5:
				return "CHA";
			default:
				return "";
		}
	};

	return (
		<View style={styles.savingBox}>
			<Text style={styles.modText}>{statToName(props.stat)}</Text>
			<Text style={styles.titleText}>{props.name}</Text>
			<View style={styles.numBox}>
				<Text style={styles.numText}>{Math.trunc(props.value)}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	savingBox: {
		flexDirection: "row",
		width: "90%",
		height: 50,
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
	modText: {
		color: "#bbb",
		fontSize: 16,
	},
});
