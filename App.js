import React, { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import firebase from "firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { updateUser } from "./redux/features/user";
import store from "./redux/store/store";

import { useAuth, useContext, userContext } from "./context";
import CharacterWindow from "./Screens/CharacterWindow";
import CameraScreen from "./Screens/CameraScreen";
import Landing from "./Screens/Landing";
import * as screens from "./Screens/Screens";

const Stack = createNativeStackNavigator();
// const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
	apiKey: "AIzaSyCU66yXQ03reHrkWl_xoDLihrU2x5n5b50",
	authDomain: "characterbuilder-f1603.firebaseapp.com",
	projectId: "characterbuilder-f1603",
	storageBucket: "characterbuilder-f1603.appspot.com",
	messagingSenderId: "949751757729",
	appId: "1:949751757729:web:c1173ace6581a7a10829e0",
};

if (firebase.apps.length === 0) {
	firebase.initializeApp(firebaseConfig);
}

export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}

const Main = (props) => {
	const user = useSelector((state) => {
		return state.signedIn.currentUser;
	});

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Landing'>
				{user ? (
					<>
						<Stack.Screen name='Home' component={CharacterWindow} options={{ headerShown: false }} />
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
