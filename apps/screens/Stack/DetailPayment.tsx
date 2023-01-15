import { Heading, HStack, ScrollView, Text, VStack } from "native-base";
import { memo, useLayoutEffect } from "react";
import Layout from "../../components/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations";
import { BASE_COLOR } from "../../utilities/baseColor";
import { FontAwesome5, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { toMoney } from "../../utilities/toMony";

type DetailPaymentScreenPropsTypes = NativeStackScreenProps<RootParamList, "DetailPayment">;

const DetailPaymentScreen = ({ route, navigation }: DetailPaymentScreenPropsTypes) => {
	const { item } = route.params;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "Detail Pembayaran",
		});
	}, []);

	return (
		<Layout>
			<ScrollView>
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
						<Text color={BASE_COLOR.text.primary} fontSize="sm">
							Gopay : 0813-7957-4223
						</Text>
						<Text color={BASE_COLOR.text.primary} fontSize="sm">
							Dana : 0813-7957-4223
						</Text>
						<Text color={BASE_COLOR.text.primary} fontSize="sm">
							ShopyPay : 0813-7957-4223
						</Text>
					</VStack>
				</VStack>
				<VStack
					space="5"
					borderWidth="1"
					rounded="md"
					borderColor="gray.200"
					backgroundColor="#FFF"
					p="5"
					mt="5"
				>
					<Heading color={BASE_COLOR.text.primary} fontSize="md">
						Upload Bukti Pembayaran Di sini
					</Heading>
					<TouchableOpacity>
						<HStack space="2" alignItems="center">
							<MaterialCommunityIcons
								name="image-plus"
								size={32}
								color={BASE_COLOR.text.primary}
							/>
							<Text color={BASE_COLOR.text.primary} fontSize="md" fontFamily="lato">
								Upload
							</Text>
						</HStack>
					</TouchableOpacity>
				</VStack>
			</ScrollView>
		</Layout>
	);
};

export default memo(DetailPaymentScreen);
