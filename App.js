import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./redux/store/store";

import CharacterWindow from "./Screens/CharacterWindow";
import CameraScreen from "./Screens/CameraScreen";
import Landing from "./Screens/Landing";
import * as screens from "./Screens/Screens";
import { selectUserEmail, selectUserName } from "./redux/features/userSlice";
import CharacterSelectScreen from "./Screens/CharacterSelectScreen";

const Stack = createNativeStackNavigator();
// const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}

const Main = (props) => {
	const userName = useSelector(selectUserName);
	// const userEmail = useSelector(selectUserEmail);

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Landing'>
				{userName ? (
					<>
						<Stack.Screen name='CharacterSelect' component={CharacterSelectScreen} />
						<Stack.Screen
							name='CharacterPage'
							component={CharacterWindow}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name='Camera'
							component={CameraScreen}
							options={{ title: "Camera", headerShown: false }}
						/>
					</>
				) : (
					<>
						<Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }} />
						<Stack.Screen
							name='Register'
							component={screens.Register}
							options={{ headerTitle: "Register" }}
						/>
						<Stack.Screen name='Login' component={screens.Login} options={{ headerTitle: "Log In" }} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
