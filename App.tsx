import React, { useEffect, useState } from "react";
import AppNavigations from "./apps/navigations";
import { NativeBaseProvider, extendTheme } from "native-base";
import { RootContext } from "./apps/utilities/rootContext";
import { AppInfoTypes, UserInfoTypes } from "./apps/types/contextApiTypes";

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

	useEffect(() => {
		setUserInfo({ name: "Jack M", email: "Jack@mail.com", coin: 500, isAuth: true });
		setAppInfo({ countDown: "30 day, 12 hour" });
	}, []);

	return (
		<NativeBaseProvider>
			<RootContext.Provider value={{ userInfo, appInfo }}>
				<AppNavigations />
			</RootContext.Provider>
		</NativeBaseProvider>
	);
}
