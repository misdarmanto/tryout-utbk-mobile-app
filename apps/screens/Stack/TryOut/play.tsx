import { Button, HStack, Progress, Text, VStack } from "native-base";
import { BASE_COLOR } from "../../../utilities/baseColor";
import { widthPercentage } from "../../../utilities/dimension";
import React, { memo, useContext } from "react";
import { tryOutContext } from "./contextApi";

const Play = () => {
	const { setTryOutState }: any = useContext(tryOutContext);

	return (
		<VStack flex={1} justifyContent="center" alignItems="center">
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
			<Button onPress={() => setTryOutState("start")}>Start</Button>
			<Button onPress={() => setTryOutState("finish")}>Finish</Button>
		</VStack>
	);
};

export default memo(Play);
