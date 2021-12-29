import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store/store";
import "react-native-gesture-handler";

import CharacterWindow from "./Screens/CharacterWindow";
import CameraScreen from "./Screens/CameraScreen";
import Landing from "./Screens/Landing";
import * as screens from "./Screens/Screens";
import { selectUserName } from "./redux/features/userSlice";
import CharacterSelectScreen from "./Screens/CharacterSelectScreen";
import CharacterCreationScreen from "./Screens/CharacterCreationScreen";
import HealthScreen from "./Screens/HealthScreen";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}

const Main = (props) => {
	const userName = useSelector(selectUserName);

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Landing'
				screenOptions={{
					headerTintColor: "white",
					headerStyle: { backgroundColor: "#555" },
					headerBackTitle: "Back",
					headerTitleStyle: { fontSize: 20, fontWeight: "normal" },
				}}>
				{userName ? (
					<>
						<Stack.Screen
							name='CharacterSelect'
							component={CharacterSelectScreen}
							options={{
								headerTitle: "Characters",
							}}
						/>
						<Stack.Screen
							name='CharacterPage'
							component={CharacterWindow}
							options={({ route }) => ({
								title: route.params.name,
							})}
						/>
						<Stack.Screen
							name='CharacterCreation'
							component={CharacterCreationScreen}
							options={{ presentation: "modal", headerShown: false }}
						/>
						<Stack.Screen
							name='HealthScreen'
							component={HealthScreen}
							options={{ presentation: "modal", headerShown: false }}
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
