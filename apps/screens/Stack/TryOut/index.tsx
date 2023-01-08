import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations/index";
import { tryOutContext } from "./contextApi";

import Finish from "./finish";
import Start from "./start";
import Play from "./play";
import Review from "./review";

type TryOutScreenPropsTypes = NativeStackScreenProps<RootParamList, "TryOut">;

export default function TryOutScreen({ navigation }: TryOutScreenPropsTypes) {
	const [tryOutState, setTryOutState] = useState<string>("start");
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
	const TRYOUT_DATA = [
		{
			id: 1,
			question: "hello wrold?",
			choices: {
				A: "hs",
				B: "world",
				C: "hslo",
				D: "aloha",
			},
			answer: "",
			correctAnswer: "A",
			review: "hello",
		},
		{
			id: 2,
			question: "good morning?",
			choices: {
				A: "hello",
				B: "world",
				C: "hallo",
				D: "aloha",
			},
			answer: "",
			correctAnswer: "A",
			review: "hello",
		},
		{
			id: 3,
			question: "hello bitch?",
			choices: {
				A: "hello",
				B: "world",
				C: "hallo",
				D: "aloha",
			},
			answer: "",
			correctAnswer: "A",
			review: "hello",
		},
		{
			id: 4,
			question: "hello wrold?",
			choices: {
				A: "helldddo",
				B: "worldfdfdfd",
				C: "hallodff",
				D: "alohdfdfa",
			},
			answer: "",
			correctAnswer: "A",
			review: "hello",
		},
		{
			id: 5,
			question: `This component is used inside a ScrollView or ListView to add pull to
						refresh functionality. When the ScrollView is at scrollY: 0, swiping down
						triggers an onRefresh event. This component is used inside a ScrollView or
						ListView to add pull to refresh functionality. When the ScrollView is at
						scrollY: 0, swiping down triggers an onRefresh event. This component is used
						inside a ScrollView or ListView to add pull to refresh functionality. When
						the ScrollView is at scrollY: 0, swiping down triggers an onRefresh event.
						This component is used inside a ScrollView or ListView to add pull to
						refresh functionality. When the ScrollView is at scrollY: 0, swiping down
						triggers an onRefresh event.`,
			choices: {
				A: "hello",
				B: "world",
				C: "hallo",
				D: "aloha",
			},
			answer: "",
			correctAnswer: "A",
			review: "hello",
		},
	];

	const [tryOutData, setTryOutData] = useState(TRYOUT_DATA);

	return (
		<Layout>
			<tryOutContext.Provider
				value={{
					tryOutState,
					setTryOutState,
					navigation,
					tryOutData,
					setTryOutData,
				}}
			>
				{renderScreen}
			</tryOutContext.Provider>
		</Layout>
	);
}
