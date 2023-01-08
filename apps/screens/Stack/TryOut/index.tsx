import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { createContext, lazy, useState } from "react";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations/index";
import Finish from "./finish";
import Start from "./start";
import Play from "./play";
import { tryOutContext } from "./contextApi";

type TryOutScreenPropsTypes = NativeStackScreenProps<RootParamList, "TryOut">;

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
		case "play":
			renderScreen = <Play />;
			break;
		default:
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
