import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { createContext, lazy, useState } from "react";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations/index";
import Finish from "./finish";
import Start from "./start";
import TryOutRun from "./tryOutRun";

type TryOutScreenPropsTypes = NativeStackScreenProps<RootParamList, "TryOut">;
export const tryOutContext: any = createContext(null);

export default function TryOutScreen({ navigation }: TryOutScreenPropsTypes) {
	const [tryOutState, setTryOutState] = useState<string>("start");
	let renderScreen;

	switch (tryOutState) {
		case "start":
			renderScreen = <Start />;
			break;
		case "finish":
			renderScreen = <Finish />;
			break;
		default:
			renderScreen = <TryOutRun />;
			break;
	}
	return (
		<Layout>
			<tryOutContext.Provider value={{ tryOutState, setTryOutState }}>
				{renderScreen}
			</tryOutContext.Provider>
		</Layout>
	);
}
