import React, { useContext } from "react";
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
import { BASE_COLOR } from "../utilities/baseColor";
import NotificationScreen from "../screens/Stack/Notification";
import DetailTryOutScreen from "../screens/Stack/DetailTryOut";
import { RootContext } from "../utilities/rootContext";
import { ContextApiTypes } from "../types/contextApiTypes";
import RankTryOutScreen from "../screens/Stack/RankTryOut";

export type RootParamList = {
	Main: undefined;
	Home: undefined;
	MyTryOut: undefined;
	TryOut: undefined;
	Profile: undefined;
	Pyment: undefined;
	DetailTryOut: undefined;
	Login: undefined;
	SignUp: undefined;
	Notification: undefined;
	RankTryOut: undefined;
};

const Tab = createBottomTabNavigator<RootParamList>();

function TabNavigation() {
	const { userInfo } = useContext<ContextApiTypes>(RootContext);
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
				tabBarActiveTintColor: BASE_COLOR.primary,
				tabBarInactiveTintColor: BASE_COLOR.gray,
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen name="MyTryOut" component={MyTryOutScreen} />
			<Tab.Screen name="Pyment" component={PymentScreen} />
			{userInfo.isAuth && <Tab.Screen name="Profile" component={ProfileScreen} />}
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
	const { userInfo } = useContext<ContextApiTypes>(RootContext);

	return (
		<NavigationContainer theme={MyTheme}>
			<Stack.Navigator initialRouteName="Main">
				<Stack.Screen
					name="Main"
					component={TabNavigation}
					options={{
						headerShown: false,
					}}
				/>
				{userInfo.isAuth && (
					<>
						<Stack.Screen name="TryOut" component={TryOutScreen} />
						<Stack.Screen name="Notification" component={NotificationScreen} />
						<Stack.Screen name="DetailTryOut" component={DetailTryOutScreen} />
						<Stack.Screen name="RankTryOut" component={RankTryOutScreen} />
					</>
				)}
				{!userInfo.isAuth && (
					<>
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="SignUp" component={SignUpScreen} />
					</>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
