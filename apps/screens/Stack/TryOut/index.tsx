import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations/index";
import { tryOutContext } from "./contextApi";
import Finish from "./finish";
import Start from "./start";
import Play from "./play";
import Review from "./review";
import { TryOutDataTypes } from "../../../types/tryOutDataTypes";

type TryOutScreenPropsTypes = NativeStackScreenProps<RootParamList, "TryOut">;

export interface ScoreTypes {
	correct: number;
	wrong: number;
	empty: number;
}

export type TryoutStateTypes = "start" | "play" | "finish" | "review" | "showScore";

export interface TryOutContextTypes {
	checkAnswer: ScoreTypes;
	tryoutState: TryoutStateTypes;
	tryOutData: TryOutDataTypes;
}

export default function TryOutScreen({ route, navigation }: TryOutScreenPropsTypes) {
	const [tryOutState, setTryOutState] = useState<TryoutStateTypes>("start");
	const [tryOutDataFinish, setTryOutDataFinish] = useState<TryOutDataTypes>();

	const { tryOutData } = route.params;

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
					tryOutDataFinish,
					setTryOutDataFinish,
				}}
			>
				{renderScreen}
			</tryOutContext.Provider>
		</Layout>
	);
}
