import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { firestore } from "../firebase";

import textStyles from "../styles/TextStyles";
import ChangeStatModal from "./ChangeStatModal";

const StatBox = (props) => {
	const [statValue, setStatValue] = useState(props.num);
	const [isChangeStat, setIsChangeStat] = useState(false);

	const statChangeView = (visible) => {
		setIsChangeStat(visible);
	};

	const changeStatValue = (newStat) => {
		if (newStat !== "") setStatValue(newStat);
		setIsChangeStat(false);
		props.update(props.index, Number(newStat));
	};

	return (
		<View style={styles.statBox}>
			<Text style={textStyles.mainText}>{props.name}</Text>
			<TouchableOpacity
				style={styles.center}
				onPress={() => {
					statChangeView(true);
				}}>
				<View style={styles.numBox}>
					<View style={styles.scoreText}>
						<Text style={textStyles.mainText}>{statValue}</Text>
					</View>
				</View>
				<View style={styles.modBox}>
					<Text style={styles.modText}>{Math.trunc(statValue / 2) - 5}</Text>
				</View>
			</TouchableOpacity>
			<ChangeStatModal visible={isChangeStat} setVisible={statChangeView} changeStat={changeStatValue} />
		</View>
	);
};

StatBox.defaultProps = {
	name: "N/A",
	num: "10",
};

const styles = StyleSheet.create({
	statBox: {
		backgroundColor: "#29293d",
		width: 100,
		height: 120,
		justifyContent: "center",
		alignItems: "center",
		borderColor: "white",
		borderWidth: 2,
		borderRadius: 5,
		padding: 10,
		marginTop: 10,
	},
	numBox: {
		width: 47,
		height: 47,
		backgroundColor: "#404040",
		borderRadius: 5,
		borderColor: "white",
		borderWidth: 2,
		padding: 10,
		marginTop: 5,
	},
	scoreText: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	modBox: {
		width: 30,
		height: 30,
		backgroundColor: "#404040",
		borderColor: "white",
		borderTopWidth: 0,
		borderWidth: 1,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	modText: {
		color: "white",
		fontSize: 15,
	},
	center: {
		justifyContent: "center",
		alignItems: "center",
	},
});

export default StatBox;
