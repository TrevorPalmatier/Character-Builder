import React from "react";
import { View, Button, StyleSheet } from "react-native";

function Landing(props) {
	return (
		<View style={styles.container}>
			<Button
				title='Register'
				onPress={() => {
					props.navigation.navigate("Register");
				}}
			/>
			<Button
				title='Log In'
				onPress={() => {
					props.navigation.navigate("Login");
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default Landing;
