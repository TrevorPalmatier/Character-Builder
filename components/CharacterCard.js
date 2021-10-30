import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import textStyles from "../styles/TextStyles";

export default function CharacterCard(props) {
	const handleClick = () => {
		props.select(props.index);
	};

	return (
		<View style={styles.main}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => {
					handleClick();
				}}>
				<Text style={textStyles.mainText}>{props.name}</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	main: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#29293d",
		width: "90%",
		height: 60,
		margin: 5,
	},
	button: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
});
