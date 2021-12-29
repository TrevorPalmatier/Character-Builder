import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import { selectCharacter, selectID, setActiveCharacter } from "../redux/features/characterSlice";
import { Picker } from "@react-native-picker/picker";

export default function HealthScreen({ route }) {
	const character = useSelector(selectCharacter);
	const [selectedItem, setSelectedItem] = useState(99);
	const [input, setInput] = useState("1");
	const itemList = route.params.nums;
	const id = useSelector(selectID);
	const dispatch = useDispatch();

	const handleValueChange = (value) => {
		setSelectedItem(value);
		setInput((100 - value).toString());
	};

	const handleHeal = (value) => {
		const newChar = { ...character };
		const maxHealth = character.maxHealth;
		const newHealth = character.health + value;
		if (newHealth >= maxHealth) {
			newChar.health = maxHealth;
		} else {
			newChar.health = newHealth;
		}
		dispatch(setActiveCharacter({ data: newChar, id }));
	};

	const handleDmg = (value) => {
		const newChar = { ...character };
		const newHealth = character.health - value;
		if (newHealth <= 0) {
			newChar.health = 0;
		} else {
			newChar.health = newHealth;
		}
		dispatch(setActiveCharacter({ data: newChar, id }));
	};

	return (
		<KeyboardAwareScrollView
			style={{ backgroundColor: "#404040" }}
			contentContainerStyle={styles.main}
			showsVerticalScrollIndicator={false}
			bounces={false}
			resetScrollToCoords={{ x: 0, y: 0 }}
			extraScrollHeight={20}>
			<View style={styles.main}>
				<View style={styles.header}>
					<View style={styles.headerTitleContainer}>
						<Text style={styles.headerTitle}>HP Management</Text>
					</View>
				</View>
				<View style={styles.hpContainer}>
					<View style={[styles.hpBox]}>
						<Text style={styles.hpNumber}>{character.health}</Text>
						<Text style={styles.hpText}>Current HP</Text>
					</View>
					<View style={styles.dashBox}>
						<Text style={{ color: "#aaa", fontSize: 35 }}>/</Text>
					</View>
					<View style={[styles.hpBox, { backgroundColor: "#404040" }]}>
						<Text style={styles.hpNumber}>{character.maxHealth}</Text>
						<Text style={styles.hpText}>Maximum HP</Text>
					</View>
					<View style={styles.modContainer}>
						<View style={styles.buttonContainer}>
							<Pressable
								style={styles.healButton}
								onPress={() => {
									handleHeal(Number(input));
								}}>
								<Text style={{ fontSize: 15, fontWeight: "600" }}>HEAL</Text>
							</Pressable>
							<TextInput
								style={styles.input}
								placeholderTextColor='#a6a6a6'
								textAlign='center'
								returnKeyType='done'
								keyboardAppearance='dark'
								keyboardType='numeric'
								value={input}
								onChangeText={setInput}
							/>
							<Pressable
								style={styles.dmgButton}
								onPress={() => {
									handleDmg(Number(input));
								}}>
								<Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>DAMAGE</Text>
							</Pressable>
						</View>
						<View style={styles.pickerContainer}>
							<Picker
								style={{ width: 120, height: 140, color: "white" }}
								selectedValue={selectedItem}
								itemStyle={{ color: "white", fontSize: 20 }}
								dropdownIconColor='white'
								onValueChange={(index) => handleValueChange(index)}>
								{itemList.map((value, i) => (
									<Picker.Item label={value} value={i} key={i} />
								))}
							</Picker>
						</View>
					</View>
				</View>
			</View>
		</KeyboardAwareScrollView>
	);
}

const styles = StyleSheet.create({
	main: {
		backgroundColor: "#404040",
		width: "100%",
		alignItems: "center",
	},
	header: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#303030",
		height: Platform.OS === "ios" ? 55 : 75,
		width: "100%",
		marginBottom: 30,
		paddingTop: Platform.OS === "ios" ? 0 : 20,
	},
	headerTitleContainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	headerTitle: {
		color: "white",
		fontSize: 18,
		fontWeight: "500",
	},
	hpContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		width: "95%",
		justifyContent: "space-evenly",
		alignItems: "center",
		backgroundColor: "#29293d",
	},
	hpBox: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height: 100,
		width: 150,
	},
	dashBox: {
		justifyContent: "center",
		alignItems: "center",
		height: 100,
		width: 70,
		backgroundColor: "#404040",
	},
	hpNumber: {
		color: "white",
		fontSize: 35,
	},
	hpText: {
		color: "#aaa",
	},
	modContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 250,
	},
	buttonContainer: {
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
		marginLeft: 20,
	},
	healButton: {
		height: 40,
		width: 130,
		backgroundColor: "#00eeaa",
		borderRadius: 3,
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	dmgButton: {
		height: 40,
		width: 130,
		backgroundColor: "red",
		borderRadius: 3,
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		width: 130,
		height: 40,
		color: "white",
		borderColor: "white",
		borderWidth: 1,
		borderRadius: 3,
		marginBottom: 20,
		backgroundColor: "#303030",
	},
	pickerContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginRight: 25,
		paddingBottom: 75,
	},
});
