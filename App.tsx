import React, { useEffect, useState } from "react";
import AppNavigations from "./apps/navigations";
import { NativeBaseProvider, extendTheme, Text } from "native-base";
import { RootContext } from "./apps/utilities/rootContext";
import { AppInfoTypes, UserInfoTypes } from "./apps/types/contextApiTypes";
import { useFonts } from "expo-font";
import NetInfo from "@react-native-community/netinfo";
import NotInternetScreen from "./apps/screens/Stack/OflineScreen";

// Define the config
const config = {
	useSystemColorMode: false,
	initialColorMode: "dark",
};

// extend the theme
export const theme = extendTheme({ config });
type MyThemeType = typeof theme;
declare module "native-base" {
	interface ICustomTheme extends MyThemeType {}
}

export default function App() {
	const [userInfo, setUserInfo] = useState<UserInfoTypes>();
	const [appInfo, setAppInfo] = useState<AppInfoTypes>();
	const [isOffline, setIsOffLine] = useState<any>(false);

	useEffect(() => {
		const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
			const offline = !(state.isConnected && state.isInternetReachable);
			setIsOffLine(offline);
		});
		return () => removeNetInfoSubscription();
	}, []);

	useEffect(() => {
		setUserInfo({ name: "Jack M", email: "Jack@mail.com", coin: 500, isAuth: true });
		setAppInfo({ countDown: "30 day, 12 hour" });
	}, []);

	const [loaded] = useFonts({
		lora: require("./assets/Font/Lora-VariableFont_wght.ttf"),
		lato: require("./assets/Font/Lato-Black.ttf"),
	});

	if (!loaded) {
		return null;
	}

	return (
		<NativeBaseProvider>
			<RootContext.Provider value={{ userInfo, appInfo }}>
				{/* {isOffline ? <NotInternetScreen /> : <AppNavigations />} */}
				<AppNavigations />
			</RootContext.Provider>
		</NativeBaseProvider>
	);
}
