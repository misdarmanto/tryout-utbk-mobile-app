import React, { useEffect, useState } from "react";
import AppNavigations from "./apps/navigations";
import { NativeBaseProvider, extendTheme } from "native-base";
import { Text } from "react-native";
import { RootContext } from "./apps/utilities/rootContext";
import { AppInfoTypes, UserInfoTypes } from "./apps/types/contextApiTypes";
import { useFonts } from "expo-font";
import NetInfo from "@react-native-community/netinfo";
import { onAuthStateChanged } from "firebase/auth";

import { LogBox } from "react-native";
import _ from "lodash";
import { auth } from "./apps/configs/firebase";
import NotInternetAnimation from "./apps/components/animations/Ofline";
import LoadingAnimation from "./apps/components/animations/Loading";
import { FireStoreUserDB } from "./apps/firebase/firebaseDB";
LogBox.ignoreLogs(["Warning:..."]); // ignore specific logs
LogBox.ignoreAllLogs(); // ignore all logs
const _console = _.clone(console);
console.warn = (message) => {
	if (message.indexOf("Setting a timer") <= -1) {
		_console.warn(message);
	}
};

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
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
			const offline = !(state.isConnected && state.isInternetReachable);
			setIsOffLine(offline);
		});
		return () => removeNetInfoSubscription();
	}, []);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			(async () => {
				if (user) {
					const userDb = new FireStoreUserDB();
					const userData: UserInfoTypes = await userDb.getUser({ documentId: user.email! });
					console.log(userData);
					userData.isAuth = true;
					setUserInfo(userData);
					setAppInfo({ countDown: "30 day, 12 hour" });
				}

				if (!user) {
					const userData: UserInfoTypes = {
						isAuth: false,
						email: "",
						name: "",
						coin: 0,
					};
					setUserInfo(userData);
					setAppInfo({ countDown: "30 day, 12 hour" });
				}
				setIsLoading(false);
			})();
		});
	}, []);

	const [loaded] = useFonts({
		lora: require("./assets/Font/Lora-VariableFont_wght.ttf"),
		lato: require("./assets/Font/Lato-Black.ttf"),
	});

	if (!loaded) {
		return null;
	}

	if (isLoading) return <Text>Loading...</Text>;

	return (
		<NativeBaseProvider>
			<RootContext.Provider value={{ userInfo, appInfo }}>
				{/* {isOffline ? <NotInternetAnimation /> : <AppNavigations />} */}
				<AppNavigations />
			</RootContext.Provider>
		</NativeBaseProvider>
	);
}
