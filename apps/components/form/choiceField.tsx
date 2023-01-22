import { Avatar, HStack, Image, Pressable, Text } from "native-base";
import React, { memo } from "react";
import { BASE_COLOR } from "../../utilities/baseColor";

interface ChoiceFieldTypes {
	alphaBet: string;
	text?: string;
	isActive?: boolean;
	isWrong?: boolean;
	onPress?: any;
	imageUrl?: string;
}

const ChoiceField = ({ alphaBet, text, isActive, isWrong, imageUrl, onPress }: ChoiceFieldTypes) => {
	let backgroundColor = "#FFF";
	let textColor = BASE_COLOR.text.primary;

	if (isActive) {
		backgroundColor = BASE_COLOR.primary;
		textColor = "#FFF";
	} else if (isWrong) {
		backgroundColor = BASE_COLOR.red[200];
		textColor = "#FFF";
	}

	return (
		<Pressable
			onPress={onPress}
			py="3"
			px="5"
			borderWidth="1"
			borderColor="gray.100"
			bg={backgroundColor}
			rounded="md"
			_pressed={{ bg: backgroundColor }}
		>
			<HStack alignItems="center" space={3}>
				<Avatar
					size="md"
					backgroundColor={isActive || isWrong ? "#FFF" : BASE_COLOR.primary}
					_text={{
						color: isActive || isWrong ? BASE_COLOR.primary : "#FFF",
						fontSize: "xl",
						fontWeight: "bold",
					}}
				>
					{alphaBet}
				</Avatar>
				{text && (
					<Text fontSize="md" color={textColor}>
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

export default memo(ChoiceField);
