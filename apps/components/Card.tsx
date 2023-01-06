import { Box, HStack, Image, Text, VStack } from "native-base";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

interface CardTypes {
	image: string;
	title: string;
	description: string;
}

export const Card = ({ image, title, description }: CardTypes) => {
	const cutText = (text: string) => {
		return text.length > 80 ? text.slice(0, 50) + "..." : text;
	};

	return (
		<TouchableOpacity activeOpacity={0.7}>
			<Box
				maxH="130"
				borderWidth={1}
				backgroundColor="white"
				borderColor="gray.200"
				my={1}
				borderRadius="5"
				rounded="md"
			>
				<HStack space={2}>
					<Image
						source={{ uri: image }}
						alt="image"
						height="120"
						roundedBottomLeft="sm"
						roundedTopLeft="sm"
						width="130"
					/>
					<Box justifyContent="space-between" p={2}>
						<VStack space="2" maxW="80%">
							<HStack justifyContent="space-between">
								<Text fontSize="md" fontWeight="bold">
									{title}
								</Text>
								<HStack space={1}>
									<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
									<Text fontSize="sm" fontWeight="bold">
										100
									</Text>
								</HStack>
							</HStack>
							<Text color="gray.500">{cutText(description)}</Text>
						</VStack>
						<HStack space={2}>
							<HStack alignItems="flex-end">
								<AntDesign name="user" size={20} color="gray" />
								<Text fontSize="xs" color="gray.500">
									100
								</Text>
							</HStack>
							<HStack alignItems="flex-end">
								<MaterialIcons name="timer" size={20} color="gray" />
								<Text fontSize="xs" color="gray.500">
									100 menit
								</Text>
							</HStack>
							<HStack space={1}>
								<FontAwesome5 name="book" size={15} color="gray" />
								<Text fontSize="xs" color="gray.500">
									100 soal
								</Text>
							</HStack>
						</HStack>
					</Box>
				</HStack>
			</Box>
		</TouchableOpacity>
	);
};
