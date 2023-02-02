import { Box, HStack, Pressable, Progress, ScrollView, Text, VStack } from "native-base";
import React, { memo, useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { tryOutContext } from "./contextApi";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { BASE_COLOR } from "../../../utilities/baseColor";
import { widthPercentage } from "../../../utilities/dimension";
import { QuestionTypes } from "../../../types/tryOutDataTypes";
import ChoiceField from "../../../components/form/choiceField";
import RenderWebView from "../../../components/webView/RenderWebView";

const Review = () => {
	const { navigation, tryOutDataFinish }: any = useContext(tryOutContext);

	const [choiceSelected, setChoiceSelected] = useState("");
	const [index, setIndex] = useState(0);

	const CURRENT_QUESTION: QuestionTypes = tryOutDataFinish.questions[index];
	const progressValue = Math.round(((index + 1) / tryOutDataFinish.questions.length) * 100);

	useEffect(() => {
		const currentAnswer = CURRENT_QUESTION.answer;
		if (currentAnswer !== "") setChoiceSelected(currentAnswer);
		if (currentAnswer === "") setChoiceSelected("");
	}, [index]);

	useEffect(() => {
		CURRENT_QUESTION.answer = choiceSelected;
	}, [choiceSelected]);

	const handleNextQuestion = useCallback(async () => {
		if (index === tryOutDataFinish.questions.length - 1) return;
		setIndex((value) => value + 1);
	}, [index]);

	const handlePreviousQuestion = useCallback(() => {
		if (0 >= index) return;
		setIndex((value) => value - 1);
	}, [index]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: tryOutDataFinish.title,
		});
	}, []);

	return (
		<VStack justifyContent="space-between" flex={1}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<HStack alignItems="center" justifyContent="space-between">
					<HStack alignItems="center">
						<Progress
							value={progressValue}
							w={widthPercentage(62)}
							mx="2"
							my="5"
							size="xl"
							bg="coolGray.100"
							_filledTrack={{
								bg: BASE_COLOR.primary,
							}}
						/>
					</HStack>
					<HStack alignItems="center" space={1}>
						<Text fontFamily="lato" color={BASE_COLOR.text.primary}>{`${index + 1}/${
							tryOutDataFinish.questions.length
						}`}</Text>
						<FontAwesome5 name="book" size={16} color={BASE_COLOR.text.primary} />
					</HStack>
				</HStack>

				<Box my="5">
					<RenderWebView htmlBody={CURRENT_QUESTION.question} />
				</Box>

				<Box>
					<Text fontFamily="lato" color={BASE_COLOR.text.primary}>
						Pembahasan:
					</Text>

					<RenderWebView htmlBody={CURRENT_QUESTION.review} />
				</Box>

				<VStack space={2} my="5">
					<ChoiceField
						alphaBet="A"
						isActive={CURRENT_QUESTION.correctAnswer === "A"}
						isWrong={choiceSelected === "A" && CURRENT_QUESTION.correctAnswer !== "A"}
						text={CURRENT_QUESTION.choices.A}
					/>
					<ChoiceField
						alphaBet="B"
						isActive={CURRENT_QUESTION.correctAnswer === "B"}
						isWrong={choiceSelected === "B" && CURRENT_QUESTION.correctAnswer !== "B"}
						text={CURRENT_QUESTION.choices.B}
					/>
					<ChoiceField
						alphaBet="C"
						isActive={CURRENT_QUESTION.correctAnswer === "C"}
						isWrong={choiceSelected === "C" && CURRENT_QUESTION.correctAnswer !== "C"}
						text={CURRENT_QUESTION.choices.C}
					/>
					<ChoiceField
						alphaBet="D"
						isActive={CURRENT_QUESTION.correctAnswer === "D"}
						isWrong={choiceSelected === "D" && CURRENT_QUESTION.correctAnswer !== "D"}
						text={CURRENT_QUESTION.choices.D}
					/>
				</VStack>
			</ScrollView>
			<HStack
				justifyContent="space-between"
				py="3"
				px="2"
				backgroundColor="#FFF"
				alignItems="center"
				borderWidth="1"
				borderColor="gray.100"
			>
				<Pressable
					onPress={handlePreviousQuestion}
					p="2"
					px="5"
					bg={BASE_COLOR.primary}
					_pressed={{ bg: BASE_COLOR.blue[200] }}
					rounded="md"
				>
					<AntDesign name="arrowleft" size={24} color="#FFF" />
				</Pressable>
				<Pressable
					onPress={handleNextQuestion}
					p="2"
					px="5"
					bg={BASE_COLOR.primary}
					rounded="md"
					_pressed={{ bg: BASE_COLOR.blue[200] }}
				>
					<AntDesign name="arrowright" size={24} color="#FFF" />
				</Pressable>
			</HStack>
		</VStack>
	);
};

export default memo(Review);
