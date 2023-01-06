import { Box, HStack, Image, Text, VStack, Button } from "native-base";
import { AntDesign } from "@expo/vector-icons";

interface CardTypes {
	image: string;
	title: string;
	description: string;
}

export const Card = ({ image, title, description }: CardTypes) => {
	const cutText = (text: string) => {
		return text.length > 80 ? text.slice(0, 80) + "..." : text;
	};

	return (
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
					<VStack space="2">
						<Text fontSize="md" fontWeight="bold">
							{title}
						</Text>
						<Text color="gray.500">{cutText(description)}</Text>
					</VStack>
					<HStack space={2}>
						<HStack alignItems="flex-end">
							<AntDesign name="user" size={20} color="gray" />
							<Text fontSize="xs" color="gray.500">
								100
							</Text>
						</HStack>

						<Text>Kerjakan</Text>
					</HStack>
				</Box>
			</HStack>
		</Box>
	);
};
