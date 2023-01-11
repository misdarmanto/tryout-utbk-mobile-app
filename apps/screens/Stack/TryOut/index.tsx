import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useRef, useState } from "react";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations/index";
import { tryOutContext } from "./contextApi";

import Finish from "./finish";
import Start from "./start";
import Play from "./play";
import Review from "./review";
import { TryOutDataTypes, TRYOUT_DATA } from "./fakeData";
import { CheckAnswerTypes } from "./types/tryOutContextTypes";

type TryOutScreenPropsTypes = NativeStackScreenProps<RootParamList, "TryOut">;

export default function TryOutScreen({ navigation }: TryOutScreenPropsTypes) {
	const [tryOutState, setTryOutState] = useState<string>("start");
	const [tryOutData, setTryOutData] = useState<TryOutDataTypes[]>(TRYOUT_DATA);
	const checkAnswer: CheckAnswerTypes = { correct: 0, wrong: 0, empty: 0 };

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
					checkAnswer,
				}}
			>
				{renderScreen}
			</tryOutContext.Provider>
		</Layout>
	);
}
