import React from "react";
import AppNavigations from "./apps/navigations";
import { NativeBaseProvider, extendTheme } from "native-base";

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
	return (
		<NativeBaseProvider>
			<AppNavigations />
		</NativeBaseProvider>
	);
}
