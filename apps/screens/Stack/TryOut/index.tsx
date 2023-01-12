import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations/index";
import { tryOutContext } from "./contextApi";

import Finish from "./finish";
import Start from "./start";
import Play from "./play";
import Review from "./review";
import { TryOutDataTypes, TRYOUT_DATA } from "./fakeData";
import { TryoutStateTypes } from "./types/tryOutContextTypes";
import ShowScore from "./showScore";

type TryOutScreenPropsTypes = NativeStackScreenProps<RootParamList, "TryOut">;

export default function TryOutScreen({ navigation }: TryOutScreenPropsTypes) {
	const [tryOutState, setTryOutState] = useState<TryoutStateTypes>("start");
	const [tryOutData, setTryOutData] = useState<TryOutDataTypes>(TRYOUT_DATA);
	const [tryOutDataFinish, setTryOutDataFinish] = useState<TryOutDataTypes>();

	let renderScreen;
	switch (tryOutState) {
		case "start":
			renderScreen = <Start />;
			break;
		case "play":
			renderScreen = <Play />;
			break;
		case "finish":
			renderScreen = <Finish />;
			break;
		case "showScore":
			renderScreen = <ShowScore />;
			break;
		case "review":
			renderScreen = <Review />;
			break;
		default:
			break;
	}

	return (
		<Layout>
			<tryOutContext.Provider
				value={{
					tryOutState,
					setTryOutState,
					navigation,
					tryOutData,
					setTryOutData,
					tryOutDataFinish,
					setTryOutDataFinish,
				}}
			>
				{renderScreen}
			</tryOutContext.Provider>
		</Layout>
	);
}
