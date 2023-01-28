import { Box, Heading, HStack, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { BASE_COLOR } from "../../../utilities/baseColor";
import { heightPercentage } from "../../../utilities/dimension";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { memo, useContext, useLayoutEffect, useState } from "react";
import { tryOutContext } from "./contextApi";
import { RootContext } from "../../../utilities/rootContext";
import { ContextApiTypes, UserInfoTypes } from "../../../types";
import { TryOutContextTypes } from ".";
import { FirestoreDB } from "../../../firebase/firebaseDB";

const Start = () => {
	const { setTryOutState, navigation }: any = useContext(tryOutContext);

	const { tryOutData } = useContext<TryOutContextTypes>(tryOutContext);
	const { userInfo } = useContext<ContextApiTypes>(RootContext);
	const { setUserInfo }: any = useContext(RootContext);

	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useLayoutEffect(() => {
		if (tryOutData.coin > userInfo.coin) {
			setIsError(true);
		}
	}, []);

	const updateUserInfo = async ({ newCoin }: { newCoin: number }) => {
		const userDB = new FirestoreDB("User");

		const newUserInfo: UserInfoTypes = {
			...userInfo,
			coin: newCoin,
		};

		await userDB.update({
			documentId: userInfo.email,
			newData: { coin: newCoin },
		});

		setUserInfo(newUserInfo);
	};

	const handleChangeTryOutState = async () => {
		if (isError) return;
		const newCoin = userInfo.coin - tryOutData.coin;
		if (newCoin < 0) return;

		if (tryOutData.coin !== 0) {
			setIsLoading(true);
			await updateUserInfo({ newCoin: newCoin });
			setIsLoading(false);
		}

		setTryOutState("play");
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Start",
			headerRight: () => "",
		});
	}, []);

	if (!tryOutData) return <Text></Text>;

	return (
		<VStack flex={1} justifyContent="center" alignItems="center">
			<Box
				backgroundColor="#FFF"
				p={5}
				borderWidth={1}
				borderColor="gray.200"
				borderRadius="5"
				rounded="md"
			>
				<Heading color={BASE_COLOR.text.primary} fontFamily="lato" fontWeight="bold" my={5}>
					{tryOutData.title}
				</Heading>
				<HStack m={2} justifyContent="space-between">
					<Text color={BASE_COLOR.text.primary} fontSize="md">
						Total Soal:
					</Text>
					<HStack space={2} p={2} px={5} rounded="md">
						<FontAwesome5 name="book" size={24} color={BASE_COLOR.text.primary} />
						<Text color={BASE_COLOR.text.primary} fontSize="md">
							{tryOutData.total} soal
						</Text>
					</HStack>
				</HStack>

				<HStack m={2} justifyContent="space-between">
					<Text color={BASE_COLOR.text.primary} fontSize="md">
						Total Coin:
					</Text>
					<HStack space={2} p={2} px={5} rounded="md">
						<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
						<Text color={BASE_COLOR.text.primary} fontSize="md">
							{tryOutData.coin}
						</Text>
					</HStack>
				</HStack>

				<HStack m={2} justifyContent="space-between">
					<Text color={BASE_COLOR.text.primary} fontSize="md">
						Waktu Pengerjaan:
					</Text>
					<HStack space={2} p={2} px={5} rounded="md">
						<MaterialIcons name="timer" size={24} color={BASE_COLOR.text.primary} />
						<Text color={BASE_COLOR.text.primary} fontSize="md">
							{tryOutData.time} menit
						</Text>
					</HStack>
				</HStack>

				<Text color={BASE_COLOR.text.secondaryGray} fontSize="sm" textAlign="justify">
					kamu akan mengerjakan {tryOutData.title} dengan waktu pengerjaan {tryOutData.time} menit,
					total koin yang dibutuhkan untuk mengerjakan soal ini adalah {tryOutData.coin} coin.
					pastikan koneksi internet mu lancar agar bisa mendapatkan hasil yang maksimal, selamat
					mengerjakan!
				</Text>

				<TouchableOpacity
					style={{ marginVertical: heightPercentage(5) }}
					onPress={handleChangeTryOutState}
					disabled={isError}
				>
					<HStack justifyContent="center" backgroundColor={BASE_COLOR.primary} rounded="md" p={2}>
						<Text color="#FFF" fontSize="md">
							{isLoading ? "Loading.." : "Mulai"}
						</Text>
					</HStack>
				</TouchableOpacity>
				{isError && (
					<HStack alignItems="center" space="1">
						<Text color="red.500">Coin mu tidak cukup, yuk top up </Text>
						<TouchableOpacity onPress={() => navigation.navigate("Payment")}>
							<Text color={BASE_COLOR.primary}>di sini!</Text>
						</TouchableOpacity>
					</HStack>
				)}
			</Box>
		</VStack>
	);
};

export default memo(Start);
