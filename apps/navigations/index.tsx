import React from "react";
import { FontAwesome5, Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Main/Home";
import MyTryOutScreen from "../screens/Main/MyTryout";
import PymentScreen from "../screens/Main/Pyment";
import ProfileScreen from "../screens/Main/Profile";
import TryOutScreen from "../screens/Stack/TryOut";
import SignUpScreen from "../screens/Auth/SignUp";
import LoginScreen from "../screens/Auth/Login";

export type RootParamList = {
	Main: undefined;
	Home: undefined;
	MyTryOut: undefined;
	TryOut: undefined;
	Profile: undefined;
	Pyment: undefined;
	Detail: undefined;
	Login: undefined;
	SignUp: undefined;
};

const Tab = createBottomTabNavigator<RootParamList>();

function TabNavigation() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarShowLabel: false,

				tabBarIcon: ({ color }) => {
					switch (route.name) {
						case "Home":
							return <Feather name="home" size={24} color={color} />;
						case "MyTryOut":
							return <FontAwesome5 name="tasks" size={24} color={color} />;
						case "Pyment":
							return <MaterialCommunityIcons name="cart-outline" size={30} color={color} />;
						case "Profile":
							return <AntDesign name="user" size={30} color={color} />;
						default:
							break;
					}
				},
				tabBarActiveTintColor: "#0e7490",
				tabBarInactiveTintColor: "gray",
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="MyTryOut" component={MyTryOutScreen} />
			<Tab.Screen name="Pyment" component={PymentScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
}

const Stack = createNativeStackNavigator<RootParamList>();

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "rgb(255, 45, 85)",
	},
};

export default function AppNavigations() {
	const isAuth = true;
	return (
		<NavigationContainer theme={MyTheme}>
			<Stack.Navigator initialRouteName="Main">
				{isAuth && (
					<>
						<Stack.Screen
							name="Main"
							component={TabNavigation}
							options={{
								headerShown: false,
							}}
						/>
						<Stack.Screen name="TryOut" component={TryOutScreen} />
					</>
				)}
				{!isAuth && (
					<>
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="SignUp" component={SignUpScreen} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
