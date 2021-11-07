import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import textStyles from "../styles/TextStyles";

export default function CharacterCard(props) {
	const handleClick = () => {
		props.select(props.index);
	};

	const handleDelete = () => {
		props.delete(props.index);
	};

	const renderRightActions = () => {
		return (
			<View
				style={{
					backgroundColor: "#e60000",
					justifyContent: "center",
					alignItems: "flex-end",
				}}>
				<Pressable
					style={styles.button}
					onPress={() => {
						handleDelete();
					}}>
					<Text
						style={{
							color: "white",
							paddingHorizontal: 10,
							fontWeight: "600",
							paddingHorizontal: 30,
							paddingVertical: 20,
						}}>
						Delete
					</Text>
				</Pressable>
			</View>
		);
	};

	return (
		<Swipeable renderRightActions={renderRightActions} rightThreshold={40}>
			<View style={styles.main}>
				<Pressable
					style={({ pressed }) => [
						styles.button,
						{
							backgroundColor: pressed ? "#333333" : "#404040",
						},
					]}
					onPress={() => {
						handleClick();
					}}
					onLongPress={() => {
						console.log("long press");
					}}>
					<Text style={textStyles.mainText}>{props.name}</Text>
				</Pressable>
			</View>
		</Swipeable>
	);
}

const styles = StyleSheet.create({
	main: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: 60,
	},
	button: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
	leftAction: {
		flex: 1,
		backgroundColor: "cyan",
		justifyContent: "center",
	},
	actionText: {
		color: "black",
		fontSize: 16,
	},
});
