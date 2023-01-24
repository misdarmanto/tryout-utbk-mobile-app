import React, { useContext } from "react";
import { FontAwesome5, Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/Main/Home";
import ExercisesScreen from "../screens/Main/TryOutList";
import PymentScreen from "../screens/Main/Pyment";
import ProfileScreen from "../screens/Main/Profile";
import TryOutScreen from "../screens/Stack/TryOut";
import SignUpScreen from "../screens/Auth/SignUp";
import LoginScreen from "../screens/Auth/Login";
import { BASE_COLOR } from "../utilities/baseColor";
import NotificationScreen from "../screens/Stack/Notification";
import DetailTryOutScreen from "../screens/Stack/DetailTryOut";
import { RootContext } from "../utilities/rootContext";
import { ContextApiTypes, PriceTypes } from "../types";
import RankTryOutScreen from "../screens/Stack/RankTryOut";
import DetailPaymentScreen from "../screens/Stack/DetailPayment";
import { TryOutDataTypes } from "../types/tryOutDataTypes";
import { heightPercentage } from "../utilities/dimension";
import TryOutListScreen from "../screens/Main/TryOutList";
import DetailArticleScreen from "../screens/Stack/Articles/detailArticle";

export type RootParamList = {
	Main: undefined;
	Home: undefined;
	TryOutList: undefined;
	TryOut: { tryOutData: TryOutDataTypes };
	Profile: undefined;
	Pyment: undefined;
	DetailTryOut: undefined;
	Login: undefined;
	SignUp: undefined;
	Notification: undefined;
	RankTryOut: undefined;
	DetailPayment: { item: PriceTypes };
	DetailArticle: undefined;
};

const Tab = createBottomTabNavigator<RootParamList>();

function TabNavigation() {
	const { userInfo } = useContext<ContextApiTypes>(RootContext);
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarStyle: { minHeight: heightPercentage(7) },
				sheaderTitleStyle: { fontFamily: "lato", color: BASE_COLOR.text.primary },
				tabBarIcon: ({ color }) => {
					switch (route.name) {
						case "Home":
							return <Feather name="home" size={24} color={color} />;
						case "TryOutList":
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
			<Tab.Screen name="Home" options={{ tabBarLabel: "Beranda" }} component={HomeScreen} />
			<Tab.Screen
				name="TryOutList"
				options={{ tabBarLabel: "Tryout", headerTitle: "TryOut" }}
				component={TryOutListScreen}
			/>
			{userInfo.isAuth && (
				<>
					<Tab.Screen
						name="Pyment"
						options={{ tabBarLabel: "Pembelian", headerTitle: "Pembelian" }}
						component={PymentScreen}
					/>
					<Tab.Screen
						name="Profile"
						options={{ tabBarLabel: "Profile" }}
						component={ProfileScreen}
					/>
				</>
			)}
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
			<Stack.Navigator
				initialRouteName="Main"
				screenOptions={{
					headerTitleStyle: { fontFamily: "lato", color: BASE_COLOR.text.primary },
				}}
			>
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
						<Stack.Screen name="DetailPayment" component={DetailPaymentScreen} />
						<Stack.Screen name="DetailArticle" component={DetailArticleScreen} />
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
