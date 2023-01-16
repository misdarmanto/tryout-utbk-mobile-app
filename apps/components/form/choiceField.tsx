import { Avatar, HStack, Image, Pressable, Text } from "native-base";
import React from "react";
import { BASE_COLOR } from "../../utilities/baseColor";

interface ChoiceFieldTypes {
	alphaBet: string;
	text?: string;
	isActive?: boolean;
	onPress?: any;
	imageUrl?: string;
}

const ChoiceField = ({ alphaBet, text, isActive, imageUrl, onPress }: ChoiceFieldTypes) => {
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
				{text && (
					<Text fontSize="md" color={isActive ? "#FFF" : BASE_COLOR.text.primary}>
						{text}
					</Text>
				)}
			</HStack>
			{imageUrl && (
				<Image mt="2" rounded="md" source={{ uri: imageUrl }} alt="Alternate Text" size="xl" />
			)}
		</Pressable>
	);
};

export default ChoiceField;
