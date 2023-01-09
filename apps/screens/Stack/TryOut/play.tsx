import {
	Avatar,
	Box,
	Button,
	HStack,
	Pressable,
	Progress,
	ScrollView,
	Text,
	VStack,
} from "native-base";
import React, { memo, useContext, useEffect, useLayoutEffect, useState } from "react";
import { tryOutContext } from "./contextApi";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { BASE_COLOR } from "../../../utilities/baseColor";
import { widthPercentage } from "../../../utilities/dimension";
import ModalPrimary from "../../../components/Modal/ModalPrimary";
import { LocalStorage } from "../../../utilities/localStorage";

const Play = () => {
	const { setTryOutState, navigation, tryOutData, setTryOutData }: any =
		useContext(tryOutContext);
	const [openModal, setOpenModal] = useState(false);

	const [question, setQuestion] = useState(tryOutData[0]);
	const [index, setIndex] = useState(0);

	const [choiceSelected, setChoiceSelected] = useState("");
	let progressValue = ((index + 1) / tryOutData.length) * 100;

	tryOutData[index].answer = choiceSelected;

	const storage = new LocalStorage("tryout1");

	useEffect(() => {
		setQuestion(tryOutData[index]);
		(async () => {
			const data = tryOutData[index];
		})();
	}, [index]);

	const handleNextQuestion = () => {
		if (index === tryOutData.length - 1) {
			setOpenModal(true);
			setTryOutData(tryOutData);
			return;
		}
		setChoiceSelected("");
		setIndex((value) => value + 1);
	};

	const handlePreviousQuestion = () => {
		if (0 >= index) return;
		setIndex((value) => value - 1);
	};

	const HeaderRightComponent = () => (
		<HStack px="3" alignItems="center" space={2}>
			<MaterialIcons name="timer" size={24} color={BASE_COLOR.text.primary} />
			<Text color={BASE_COLOR.text.primary} fontSize="md">
				60:00:20
			</Text>
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
					<Text color={BASE_COLOR.text.primary}>{question.question}</Text>
				</Box>

				<VStack space={2} my="10">
					<ChoiceField
						alphaBet="A"
						isActive={choiceSelected === "A"}
						onPress={() => setChoiceSelected("A")}
						text={question.choices.A}
					/>
					<ChoiceField
						alphaBet="B"
						isActive={choiceSelected === "B"}
						onPress={() => setChoiceSelected("B")}
						text={question.choices.B}
					/>
					<ChoiceField
						alphaBet="C"
						isActive={choiceSelected === "C"}
						onPress={() => setChoiceSelected("C")}
						text={question.choices.C}
					/>
					<ChoiceField
						alphaBet="D"
						isActive={choiceSelected === "D"}
						onPress={() => setChoiceSelected("D")}
						text={question.choices.D}
					/>
				</VStack>
			</ScrollView>

			<Button
				onPress={async () => {
					await LocalStorage.clearAll();
				}}
			>
				Clear
			</Button>

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
				onBtnYesClick={() => setTryOutState("review")}
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
