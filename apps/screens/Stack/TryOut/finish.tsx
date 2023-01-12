import { Box, HStack, Progress, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { BASE_COLOR } from "../../../utilities/baseColor";
import { heightPercentage, widthPercentage } from "../../../utilities/dimension";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { memo, useContext, useLayoutEffect, useState } from "react";
import { tryOutContext } from "./contextApi";
import { RootContext } from "../../../utilities/rootContext";
import { ContextApiTypes } from "../../../types/contextApiTypes";
import { ScoreTypes } from "./types/tryOutContextTypes";
import { TryOutDataTypes } from "./fakeData";

const Finish = () => {
	const { setTryOutState, navigation, tryOutDataFinish }: any = useContext(tryOutContext);
	const { userInfo } = useContext<ContextApiTypes>(RootContext);
	const [score, setScore] = useState<ScoreTypes>({ correct: 0, wrong: 0, empty: 0 });

	const [isError, setIsError] = useState(false);

	useLayoutEffect(() => {
		if (100 >= userInfo.coin) {
			setIsError(true);
		}

		const finished: TryOutDataTypes = tryOutDataFinish;

		const correct = finished.questions.filter((question) => {
			return question.answer === question.correctAnswer;
		});

		const wrong = finished.questions.filter((question) => {
			return question.answer !== question.correctAnswer && question.answer !== "";
		});

		const empty = finished.questions.filter((question) => {
			return question.answer === "";
		});

		setScore({ correct: correct.length, wrong: wrong.length, empty: empty.length });
	}, []);

	console.log(score);

	const handleTryOutState = () => {
		setTryOutState("review");
	};

	let progressValue = ((score?.correct! + 1) / tryOutDataFinish.questions.length) * 100;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Score",
			headerRight: () => "",
		});
	}, []);

	return (
		<VStack flex={1} justifyContent="center" alignItems="center">
			<Box
				width={widthPercentage(90)}
				minH={heightPercentage(30)}
				backgroundColor="#FFF"
				p={5}
				borderWidth={1}
				borderColor="gray.200"
				borderRadius="5"
				rounded="md"
			>
				<HStack alignItems="center">
					<Progress
						value={progressValue}
						w={widthPercentage(68)}
						my="5"
						size="xl"
						bg="coolGray.100"
						_filledTrack={{
							bg: BASE_COLOR.primary,
						}}
					/>
					<Text color={BASE_COLOR.text.primary} ml="3" fontSize="md" fontWeight="bold">
						{progressValue}%
					</Text>
				</HStack>

				<HStack my={8} justifyContent="space-between">
					<VStack
						p={3}
						px={5}
						backgroundColor={BASE_COLOR.green}
						alignItems="center"
						justifyContent="center"
						rounded="md"
					>
						<Text color="#FFF" fontFamily="lato" fontSize="md">
							{score.correct}
						</Text>
						<Text color="#FFF" fontSize="sm">
							benar
						</Text>
					</VStack>

					<VStack
						p={3}
						px={5}
						backgroundColor={BASE_COLOR.red[200]}
						alignItems="center"
						justifyContent="center"
						rounded="md"
					>
						<Text color="#FFF" fontFamily="lato" fontSize="md">
							{score.wrong}
						</Text>
						<Text color="#FFF" fontSize="sm">
							salah
						</Text>
					</VStack>

					<VStack
						p={3}
						px={5}
						backgroundColor={BASE_COLOR.yellow}
						alignItems="center"
						justifyContent="center"
						rounded="md"
					>
						<Text color="#FFF" fontFamily="lato" fontSize="md">
							{score.empty}
						</Text>
						<Text color="#FFF" fontSize="sm">
							salah
						</Text>
					</VStack>
				</HStack>

				<HStack justifyContent="space-between">
					<HStack space={2} p={2} px={5} backgroundColor={BASE_COLOR.blue[100]} rounded="md">
						<FontAwesome5 name="book" size={24} color={BASE_COLOR.text.primary} />
						<Text color={BASE_COLOR.text.primary} fontSize="md">
							{tryOutDataFinish.total} soal
						</Text>
					</HStack>

					<HStack space={2} p={2} px={5} backgroundColor={BASE_COLOR.blue[100]} rounded="md">
						<MaterialIcons name="timer" size={24} color={BASE_COLOR.text.primary} />
						<Text color={BASE_COLOR.text.primary} fontSize="md">
							{tryOutDataFinish.time} menit
						</Text>
					</HStack>
				</HStack>

				<TouchableOpacity
					style={{ marginVertical: heightPercentage(5) }}
					onPress={handleTryOutState}
					disabled={isError}
				>
					<HStack justifyContent="center" backgroundColor={BASE_COLOR.primary} rounded="md" p={2}>
						<Text color="#FFF" fontSize="md">
							Review
						</Text>
					</HStack>
				</TouchableOpacity>
			</Box>
		</VStack>
	);
};

export default memo(Finish);
