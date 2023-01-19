import { Button, Heading, HStack, ScrollView, Text, VStack } from "native-base";
import { memo, useContext, useLayoutEffect, useState } from "react";
import Layout from "../../components/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations";
import { BASE_COLOR } from "../../utilities/baseColor";
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, TouchableOpacity } from "react-native";
import { toMoney } from "../../utilities/toMony";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes } from "../../types";
import { FirebaseStorage } from "../../firebase/storage";
import { heightPercentage, widthPercentage } from "../../utilities/dimension";

type DetailPaymentScreenPropsTypes = NativeStackScreenProps<RootParamList, "DetailPayment">;

const DetailPaymentScreen = ({ route, navigation }: DetailPaymentScreenPropsTypes) => {
	const { item } = route.params;
	const { appInfo, userInfo } = useContext<ContextApiTypes>(RootContext);

	const [image, setImage] = useState("");
	const [loading, setLoading] = useState(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Detail Pembayaran",
		});
	}, []);

	const storage = new FirebaseStorage();

	const handlePickImage = async () => {
		try {
			const imageUri = await storage.pickImageFromStorage();
			console.log(imageUri);
			setImage(imageUri);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUploadeImage = async () => {
		setLoading(true);
		try {
			await storage.uploadImage({ imageUri: image, fileName: userInfo.name });
			alert("Berhasil di upload, pembayaran mu sedang diverifikasi");
			setImage("");
		} catch (error) {
			alert(error);
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

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
					<HStack space={1}>
						<Heading color={BASE_COLOR.text.primary} fontSize="xl">
							Top Up -
						</Heading>
						<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
						<Heading color={BASE_COLOR.text.primary} fontSize="xl">
							{item.totalCoin} Coin
						</Heading>
					</HStack>
					<HStack space={1} justifyContent="space-between">
						<Text color={BASE_COLOR.text.primary} fontSize="md">
							Total Pembayaran
						</Text>
						<Text color={BASE_COLOR.text.primary} fontSize="md">
							Rp.{toMoney(item.totalAmount)}
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
							lakukan pembayaran menggunakan salah satu metode pembayaran berikut dan upload
							bukti pembayaran di form yang telah disediakan, kami akan segera memprosess. Jika
							terdapat kendala silahkan hubungi nomor whatsapp berikut +62813-7957-4223
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
					<Heading color={BASE_COLOR.text.primary} fontSize="md">
						Upload Bukti Pembayaran Di Sini
					</Heading>
					<TouchableOpacity onPress={handlePickImage}>
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
