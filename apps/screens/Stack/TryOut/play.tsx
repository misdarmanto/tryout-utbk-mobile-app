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
import { BASE_COLOR } from "../../../utilities/baseColor";
import { widthPercentage } from "../../../utilities/dimension";
import React, { memo, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { tryOutContext } from "./contextApi";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const Play = () => {
	const { setTryOutState, navigation }: any = useContext(tryOutContext);
	const [tryOutData, settryOutData] = useState(TRYOUT_DATA[0]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		settryOutData(TRYOUT_DATA[index]);
	}, [index]);

	const handleNextQuestion = () => {
		if (index === TRYOUT_DATA.length) return;
		setIndex(index + 1);
	};

	const handlePreviousQuestion = () => {
		if (0 >= index) return;
		setIndex(index - 1);
	};

	console.log(index);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<HStack px="3" alignItems="center" space={2}>
					<MaterialIcons name="timer" size={24} color={BASE_COLOR.text.primary} />
					<Text color={BASE_COLOR.text.primary} fontSize="md">
						60:00:20
					</Text>
				</HStack>
			),
		});
	}, []);

	return (
		<VStack justifyContent="space-between" flex={1}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<HStack alignItems="center">
					<Progress
						value={50}
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
						80%
					</Text>
				</HStack>

				<Box my="10">
					<Text color={BASE_COLOR.text.primary}>{tryOutData.question}</Text>
				</Box>

				<VStack space={2} my="10">
					<ChoiceField
						alphaBet="A"
						isActive={true}
						onPress={() => null}
						text={tryOutData.choices.A}
					/>
					<ChoiceField alphaBet="B" onPress={() => null} text={tryOutData.choices.B} />
					<ChoiceField alphaBet="C" onPress={() => null} text={tryOutData.choices.C} />
					<ChoiceField alphaBet="D" onPress={() => null} text={tryOutData.choices.D} />
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
		correctAnswer: "A",
		review: "hello",
	},
];

export default memo(Play);
