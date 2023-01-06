import { View } from "native-base";
import React, { PropsWithChildren } from "react";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<View flex={1} px={2} backgroundColor="#F1F7FC">
			{children}
		</View>
	);
};

export default Layout;
