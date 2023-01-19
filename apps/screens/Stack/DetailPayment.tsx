import { Button, Heading, HStack, ScrollView, Text, VStack } from "native-base";
import { memo, useContext, useEffect, useLayoutEffect, useState } from "react";
import Layout from "../../components/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations";
import { BASE_COLOR } from "../../utilities/baseColor";
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity } from "react-native";
import { toMoney } from "../../utilities/toMony";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes, UserInfoTypes } from "../../types";
import { FirebaseStorage } from "../../firebase/storage";
import { FirestoreDB } from "../../firebase/firebaseDB";
import { heightPercentage, widthPercentage } from "../../utilities/dimension";
import { LocalStorage } from "../../localStorage";

type DetailPaymentScreenPropsTypes = NativeStackScreenProps<RootParamList, "DetailPayment">;

const DetailPaymentScreen = ({ route, navigation }: DetailPaymentScreenPropsTypes) => {
	const { item } = route.params;
	const { appInfo, userInfo } = useContext<ContextApiTypes>(RootContext);
	const { setUserInfo }: any = useContext(RootContext);

	const [image, setImage] = useState("");
	const [loading, setLoading] = useState(false);
	const [isWaiting, setIsWaiting] = useState(false);

	const KEY = `${userInfo.email}_${item.id}`;
	const transactionLocalStorage = new LocalStorage(KEY);

	const storage = new FirebaseStorage();

	useEffect(() => {
		const userTransactionsChek = userInfo.waitingListTransaction?.includes(item.id);
		if (userTransactionsChek) {
			setIsWaiting(true);
		}
	}, []);

	const handlePickImage = async () => {
		try {
			const imageUri = await storage.pickImageFromStorage();
			setImage(imageUri);
		} catch (error) {
			console.log(error);
		}
	};

	interface WriteLogTansactionTypes {
		id: string;
		userName: string;
		email: string;
		coin: number;
		price: number;
		image: string;
		isVerify: boolean;
	}

	const writeLogTransaction = async (transaction: WriteLogTansactionTypes) => {
		const userTransactions = new FirestoreDB("Transactions");
		const documentName = `${userInfo.email}_${item.id}`;

		const currentDateTime = new Date();
		await userTransactions.set({
			documentId: documentName,
			data: {
				id: item.id,
				time: currentDateTime.toDateString(),
				userName: transaction.userName,
				email: transaction.email,
				coin: transaction.coin,
				price: transaction.price,
				image: transaction.image,
				isVerify: transaction.isVerify,
			},
		});

		const newUserInfo: UserInfoTypes = {
			...userInfo,
			waitingListTransaction: [...userInfo.waitingListTransaction, item.id],
		};
		setUserInfo(newUserInfo);
	};

	const handleUploadeImage = async () => {
		setLoading(true);
		const userDb = new FirestoreDB("User");

		try {
			const imageUri = await storage.uploadImage({
				imageUri: image,
				fileName: userInfo.name,
			});

			await writeLogTransaction({
				id: item.id,
				userName: userInfo.name,
				email: userInfo.email,
				coin: item.totalCoin,
				price: item.totalPrice,
				image: imageUri,
				isVerify: false,
			});

			const newData: UserInfoTypes = {
				...userInfo,
				waitingListTransaction: [...userInfo?.waitingListTransaction, item.id],
			};

			await userDb.update({ documentId: userInfo.email, newData: newData });

			alert("Berhasil di upload, pembayaran mu sedang diverifikasi");
			setImage("");
			setIsWaiting(true);
		} catch (error) {
			alert(error);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Detail Pembayaran",
		});
	}, []);

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<VStack
					space={2}
					borderWidth="1"
					borderColor="gray.200"
					rounded="md"
					backgroundColor="#FFF"
					p="5"
					mt="5"
				>
					<HStack justifyContent="space-between" alignItems="center">
						<HStack space={1}>
							<Heading color={BASE_COLOR.text.primary} fontSize="xl">
								Top Up -
							</Heading>
							<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
							<Heading color={BASE_COLOR.text.primary} fontSize="xl">
								{item.totalCoin} Coin
							</Heading>
						</HStack>
						{isWaiting && (
							<Text color={BASE_COLOR.yellow} fontSize="md">
								sedang diprosess
							</Text>
						)}
					</HStack>
					<HStack space={1} justifyContent="space-between">
						<Text color={BASE_COLOR.text.primary} fontSize="md">
							Total Pembayaran
						</Text>
						<Text color={BASE_COLOR.text.primary} fontSize="md">
							Rp.{toMoney(item.totalPrice)}
						</Text>
					</HStack>
				</VStack>
				<VStack
					space={2}
					borderWidth="1"
					rounded="md"
					borderColor="gray.200"
					backgroundColor="#FFF"
					p="5"
					mt="5"
				>
					<Heading color={BASE_COLOR.text.primary} fontSize="xl">
						Pilih Metode Pembayaran
					</Heading>
					<HStack space={1}>
						<FontAwesome name="warning" size={20} color={BASE_COLOR.text.secondaryGray} />
						<Text color={BASE_COLOR.text.secondaryGray} fontSize="sm">
							{appInfo.payment.message}
						</Text>
					</HStack>

					<VStack space="3" mt="10">
						{appInfo.payment.paymentMethods.map((method, index: number) => (
							<Text key={index} color={BASE_COLOR.text.primary} fontSize="sm">
								{method}
							</Text>
						))}
					</VStack>
				</VStack>
				<VStack
					space="5"
					borderWidth="1"
					rounded="md"
					borderColor="gray.200"
					backgroundColor="#FFF"
					p="5"
					my="5"
				>
					{!isWaiting && (
						<Heading color={BASE_COLOR.text.primary} fontSize="md">
							Upload Bukti Pembayaran Di Sini
						</Heading>
					)}

					{isWaiting && (
						<Heading color={BASE_COLOR.yellow} fontSize="md">
							pembayaran mu sedang diprosess
						</Heading>
					)}

					<TouchableOpacity disabled={isWaiting} onPress={handlePickImage}>
						<HStack space="2" alignItems="center" justifyContent="center" minH="32">
							{!image && (
								<MaterialCommunityIcons name="image-plus" size={50} color={BASE_COLOR.gray} />
							)}
							{image && (
								<Image
									style={{ width: widthPercentage(50), height: heightPercentage(30) }}
									source={{ uri: image }}
								/>
							)}
						</HStack>
					</TouchableOpacity>
					{image && (
						<TouchableOpacity>
							<Button onPress={handleUploadeImage} mt="5" backgroundColor={BASE_COLOR.primary}>
								{loading ? "Loading..." : "Upload"}
							</Button>
						</TouchableOpacity>
					)}
				</VStack>
			</ScrollView>
		</Layout>
	);
};

export default memo(DetailPaymentScreen);

// (async () => {
// 	const getLog = await transactionLocalStorage.getItem();
// 	console.log(getLog);
// 	if (getLog) {
// 		const previousTimeInMilliSecond = parseInt(getLog);
// 		const currentTimeInMilliSecond = Date.now();
// 		const checkTransaction = currentTimeInMilliSecond <= previousTimeInMilliSecond;
// 		if (checkTransaction) {
// 			setIsWaiting(true);
// 		} else {
// 			await transactionLocalStorage.remove();
// 		}
// 	}
// })();

// const setLogTransactionToLocalStorage = async () => {
// 	const timeInMilliSecond = 60000;
// 	const timeInMinute = timeInMilliSecond * 2;
// 	const expireUntile = timeInMinute;

// 	const currentDateTimeInMilliSecond = Date.now() + expireUntile;
// 	const result = await transactionLocalStorage.setItem(currentDateTimeInMilliSecond);
// 	return result;
// };
