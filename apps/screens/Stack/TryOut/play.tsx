import { Avatar, Box, HStack, Pressable, Progress, ScrollView, Text, VStack } from "native-base";
import React, { memo, useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import { tryOutContext } from "./contextApi";
import { AntDesign } from "@expo/vector-icons";
import { BASE_COLOR } from "../../../utilities/baseColor";
import { widthPercentage } from "../../../utilities/dimension";
import ModalPrimary from "../../../components/Modal/ModalPrimary";
import { LocalStorage } from "../../../utilities/localStorage";
import { QuestionTypes } from "./fakeData";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const Play = () => {
	const { navigation, tryOutData, setTryOutDataFinish, setTryOutState }: any = useContext(tryOutContext);

	const [openModal, setOpenModal] = useState(false);
	const [choiceSelected, setChoiceSelected] = useState("");
	const [index, setIndex] = useState(0);

	const storage = new LocalStorage("tryout1");
	const CURRENT_QUESTION: QuestionTypes = tryOutData.questions[index];
	let progressValue = ((index + 1) / tryOutData.questions.length) * 100;

	useEffect(() => {
		const currentAnswer = CURRENT_QUESTION.answer;
		if (currentAnswer !== "") setChoiceSelected(currentAnswer);
		if (currentAnswer === "") setChoiceSelected("");
	}, [index]);

	useEffect(() => {
		CURRENT_QUESTION.answer = choiceSelected;
	}, [choiceSelected]);

	const handleNextQuestion = useCallback(async () => {
		if (index === tryOutData.questions.length - 1) {
			setOpenModal(true);
			setTryOutDataFinish(tryOutData);
			// await storage.store(tryOutData);
			return;
		}
		setIndex((value) => value + 1);
	}, [index]);

	const handlePreviousQuestion = useCallback(() => {
		if (0 >= index) return;
		setIndex((value) => value - 1);
	}, [index]);

	const handleSelectAnswer = (alphabet: string) => {
		if (choiceSelected !== "") setChoiceSelected("");
		setChoiceSelected(alphabet);
	};

	const HeaderRightComponent = () => (
		<HStack px="3" alignItems="center" space={2}>
			<CountdownCircleTimer
				isPlaying
				size={30}
				duration={tryOutData.timmer}
				strokeWidth={3}
				colors={["#1E90FF", "#47D5C0", "#FF87A4", "#FF87A4"]}
				colorsTime={[10, 5, 2, 0]}
			>
				{({ remainingTime }) => <Text>{remainingTime}</Text>}
			</CountdownCircleTimer>
		</HStack>
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <HeaderRightComponent />,
		});
	}, []);

	return (
		<VStack justifyContent="space-between" flex={1}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<HStack alignItems="center">
					<Progress
						value={progressValue}
						w={widthPercentage(75)}
						mx="4"
						my="5"
						size="xl"
						bg="coolGray.100"
						_filledTrack={{
							bg: BASE_COLOR.primary,
						}}
					/>
					<Text color={BASE_COLOR.text.primary} fontSize="md" fontWeight="bold">
						{progressValue}%
					</Text>
				</HStack>

				<Box my="10">
					<Text color={BASE_COLOR.text.primary}>{CURRENT_QUESTION.question}</Text>
				</Box>

				<VStack space={2} my="10">
					<ChoiceField
						alphaBet="A"
						isActive={choiceSelected === "A"}
						onPress={() => handleSelectAnswer("A")}
						text={CURRENT_QUESTION.choices.A}
					/>
					<ChoiceField
						alphaBet="B"
						isActive={choiceSelected === "B"}
						onPress={() => handleSelectAnswer("B")}
						text={CURRENT_QUESTION.choices.B}
					/>
					<ChoiceField
						alphaBet="C"
						isActive={choiceSelected === "C"}
						onPress={() => handleSelectAnswer("C")}
						text={CURRENT_QUESTION.choices.C}
					/>
					<ChoiceField
						alphaBet="D"
						isActive={choiceSelected === "D"}
						onPress={() => handleSelectAnswer("D")}
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
			<ModalPrimary
				openModel={openModal}
				onCloseModal={setOpenModal}
				modalHeaderTitle="Kumpulkan"
				modalText="Apakah yakin jawaban mu sudah selesai?"
				btnNoTitle="Koreksi"
				btnYesTitle="Selesai"
				onBtnYesClick={() => setTryOutState("showScore")}
			/>
		</VStack>
	);
};

interface ChoiceFieldTypes {
	alphaBet: string;
	text: string;
	isActive?: boolean;
	onPress: any;
}

const ChoiceField = ({ alphaBet, text, isActive, onPress }: ChoiceFieldTypes) => {
	return (
		<Pressable
			onPress={onPress}
			py="3"
			px="5"
			borderWidth="1"
			borderColor="gray.100"
			bg={isActive ? BASE_COLOR.primary : "#FFF"}
			rounded="md"
			_pressed={{ bg: BASE_COLOR.blue[100] }}
		>
			<HStack alignItems="center" space={3}>
				<Avatar
					size="md"
					backgroundColor={isActive ? "#FFF" : BASE_COLOR.primary}
					_text={{
						color: isActive ? BASE_COLOR.primary : "#FFF",
						fontSize: "xl",
						fontWeight: "bold",
					}}
				>
					{alphaBet}
				</Avatar>
				<Text fontSize="md" color={isActive ? "#FFF" : BASE_COLOR.text.primary}>
					{text}
				</Text>
			</HStack>
		</Pressable>
	);
};

export default memo(Play);
