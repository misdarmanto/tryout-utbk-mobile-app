import { Box, Heading, HStack, Pressable, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { BASE_COLOR } from "../../../utilities/baseColor";
import { heightPercentage, widthPercentage } from "../../../utilities/dimension";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { memo, useContext } from "react";
import { tryOutContext } from "./contextApi";

const Start = () => {
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
				<Heading color={BASE_COLOR.text.primary} fontWeight="bold" my={5}>
					Title Tryout #1
				</Heading>
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
						<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
						<Text color={BASE_COLOR.text.primary} fontSize="md">
							100
						</Text>
					</HStack>
				</HStack>

				<HStack m={2} justifyContent="space-between">
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
					<HStack space={2}>
						<Pressable
							_pressed={{ backgroundColor: BASE_COLOR.blue[50] }}
							backgroundColor={BASE_COLOR.blue[100]}
							rounded="md"
							p={2}
							px={5}
						>
							<Text color={BASE_COLOR.text.primary} fontSize="md">
								+
							</Text>
						</Pressable>
						<Pressable
							_pressed={{ backgroundColor: BASE_COLOR.blue[50] }}
							backgroundColor={BASE_COLOR.blue[100]}
							rounded="md"
							p={2}
							px={5}
						>
							<Text color={BASE_COLOR.text.primary} fontSize="md">
								-
							</Text>
						</Pressable>
					</HStack>
				</HStack>

				<TouchableOpacity
					style={{ marginVertical: heightPercentage(5) }}
					onPress={() => setTryOutState("play")}
				>
					<HStack
						justifyContent="center"
						backgroundColor={BASE_COLOR.primary}
						rounded="md"
						p={2}
					>
						<Text color="#FFF" fontSize="md">
							Mulai
						</Text>
					</HStack>
				</TouchableOpacity>
			</Box>
		</VStack>
	);
};

export default memo(Start);
