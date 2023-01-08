import { Box, HStack, Progress, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { BASE_COLOR } from "../../../utilities/baseColor";
import { heightPercentage, widthPercentage } from "../../../utilities/dimension";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { memo, useContext } from "react";
import { tryOutContext } from "./contextApi";

const Finish = () => {
	const { tryOutState, setTryOutState }: any = useContext(tryOutContext);

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
						value={45}
						w={widthPercentage(60)}
						mx="4"
						size="md"
						bg="coolGray.100"
						_filledTrack={{
							bg: BASE_COLOR.primary,
						}}
					/>
					<Text color={BASE_COLOR.text.primary} fontSize="md" fontWeight="bold">
						80%
					</Text>
				</HStack>
				<HStack m={2} my={8} justifyContent="space-between">
					<VStack
						px={5}
						py={3}
						backgroundColor={BASE_COLOR.yellow}
						rounded="md"
						alignItems="center"
						justifyContent="center"
					>
						<Text color="#FFF" fontSize="md" fontWeight="bold">
							10
						</Text>
						<Text color="#FFF" fontSize="md">
							Benar
						</Text>
					</VStack>
					<VStack
						px={5}
						py={3}
						backgroundColor={BASE_COLOR.red[200]}
						rounded="md"
						alignItems="center"
						justifyContent="center"
					>
						<Text color="#FFF" fontSize="md" fontWeight="bold">
							10
						</Text>
						<Text color="#FFF" fontSize="md">
							Salah
						</Text>
					</VStack>

					<VStack
						px={4}
						py={3}
						backgroundColor={BASE_COLOR.text.secondaryGray}
						rounded="md"
						alignItems="center"
						justifyContent="center"
					>
						<Text color="#FFF" fontSize="md" fontWeight="bold">
							0
						</Text>
						<Text color="#FFF" fontSize="md">
							Kosong
						</Text>
					</VStack>
				</HStack>

				<HStack m={2} justifyContent="space-between">
					<HStack
						space={2}
						p={2}
						px={5}
						backgroundColor={BASE_COLOR.blue[100]}
						rounded="md"
					>
						<FontAwesome5 name="book" size={24} color={BASE_COLOR.text.primary} />
						<Text color={BASE_COLOR.text.primary} fontSize="md">
							100 soal
						</Text>
					</HStack>
					<HStack
						space={2}
						p={2}
						px={5}
						backgroundColor={BASE_COLOR.blue[100]}
						rounded="md"
					>
						<MaterialIcons name="timer" size={24} color={BASE_COLOR.text.primary} />
						<Text color={BASE_COLOR.text.primary} fontSize="md">
							100 menit
						</Text>
					</HStack>
				</HStack>

				<TouchableOpacity
					style={{ marginVertical: heightPercentage(5) }}
					onPress={() => setTryOutState("play")}
				>
					<HStack
						justifyContent="center"
						backgroundColor={BASE_COLOR.primary}
						rounded="full"
						p={2}
					>
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
