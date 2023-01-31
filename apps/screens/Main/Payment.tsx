import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, HStack, ScrollView, Text, VStack } from "native-base";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BASE_COLOR } from "../../utilities/baseColor";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes } from "../../types";
import { useContext } from "react";
import { toMoney } from "../../utilities/toMony";
import { TouchableOpacity, Share } from "react-native";
import { widthPercentage } from "../../utilities/dimension";

type PaymentScreenPropsTypes = NativeStackScreenProps<RootParamList, "Payment">;

export default function PaymentScreen({ navigation }: PaymentScreenPropsTypes) {
	const { appInfo, userInfo } = useContext<ContextApiTypes>(RootContext);

	const onShare = async () => {
		try {
			await Share.share({
				message: "https://play.google.com/store/apps/details?id=com.misdar.utbk",
			});
		} catch (error: any) {
			alert(error.message);
		}
	};

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<HStack
					backgroundColor="#FFF"
					p={5}
					alignItems="center"
					justifyContent="space-between"
					borderWidth={1}
					borderColor="gray.200"
					my={1}
					borderRadius="5"
					rounded="md"
				>
					<HStack alignItems="center" space={2}>
						<Avatar>{userInfo.name[0]}</Avatar>
						<VStack>
							<Text fontSize="md" fontFamily="lato" color={BASE_COLOR.text.primary}>
								{userInfo.name}
							</Text>
							<Text fontSize="xs" color={BASE_COLOR.text.primary}>
								{userInfo.email}
							</Text>
						</VStack>
					</HStack>
					<HStack space={1} alignItems="center">
						<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
						<Text fontSize="sm" fontFamily="lato" color={BASE_COLOR.text.primary}>
							{userInfo.coin}
						</Text>
					</HStack>
				</HStack>

				<ScrollView horizontal showsHorizontalScrollIndicator={false} my={5}>
					{appInfo.payment.priceList.map((item, index: number) => {
						return (
							<CardPyment
								key={index}
								title="Detail"
								onPress={() => navigation.navigate("DetailPayment", { item })}
								totalCoin={item.totalCoin}
								price={item.totalPrice}
								discount={item.discount}
							/>
						);
					})}
				</ScrollView>

				<VStack
					backgroundColor="#FFF"
					px={5}
					py={2}
					borderWidth={1}
					borderColor="gray.200"
					my={1}
					space={5}
					borderRadius="5"
					rounded="md"
				>
					<HStack space={2} alignItems="flex-end">
						<MaterialIcons name="ondemand-video" size={24} color={BASE_COLOR.text.primary} />
						<Text
							fontSize="md"
							fontFamily="lato"
							fontWeight="bold"
							color={BASE_COLOR.text.primary}
						>
							Lihat Iklan untuk mendapatkan 5 koin
						</Text>
					</HStack>
					<Text fontSize="sm" color={BASE_COLOR.text.primary}>
						Pastikan kamu melihat iklan hingga selesai untuk mendapatkan koin
					</Text>
					<HStack justifyContent="space-between">
						<HStack space={1}>
							<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
							<Text fontSize="sm" fontWeight="bold" color={BASE_COLOR.text.primary}>
								{5} coin
							</Text>
						</HStack>
						<TouchableOpacity
							style={{
								backgroundColor: BASE_COLOR.primary,
								padding: 5,
								paddingHorizontal: 10,
								borderRadius: 5,
							}}
							onPress={() => {
								navigation.navigate("RewardAd");
							}}
						>
							<Text style={{ color: "#FFF", fontSize: 15 }}>Lihat</Text>
						</TouchableOpacity>
					</HStack>
				</VStack>

				<TouchableOpacity onPress={onShare} activeOpacity={0.7}>
					<VStack
						backgroundColor="#FFF"
						px={5}
						py={2}
						borderWidth={1}
						borderColor="gray.200"
						my={1}
						space={5}
						borderRadius="5"
						rounded="md"
					>
						<HStack space={2}>
							<Ionicons name="ios-people" size={24} color={BASE_COLOR.text.primary} />
							<Text
								fontSize="md"
								fontFamily="lato"
								fontWeight="bold"
								color={BASE_COLOR.text.primary}
							>
								Undang teman dapatkan 50 coin
							</Text>
						</HStack>
						<Text fontSize="sm" color={BASE_COLOR.text.primary}>
							Salin kode referral mu dibawah ini dan share ke teman mu, pastikan teman mu
							memasukan kode referral tersebut pada saat melakukan pendaftaran
						</Text>
						<Text fontSize="md" color={BASE_COLOR.text.primary}>
							kode referral mu : {userInfo.referralCode}
						</Text>
						<HStack justifyContent="space-between">
							<HStack space={1}>
								<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
								<Text fontSize="sm" fontWeight="bold" color={BASE_COLOR.text.primary}>
									{50} coin
								</Text>
							</HStack>
						</HStack>
					</VStack>
				</TouchableOpacity>
			</ScrollView>
		</Layout>
	);
}

interface CardPymentTpes {
	title?: string;
	totalCoin: number;
	price: number;
	discount: number;
	onPress?: any;
}

const CardPyment = ({ title = "Top Up", totalCoin, price, discount, onPress }: CardPymentTpes) => {
	const calculateDiscount = (price / 100) * discount;
	const percentage = price - calculateDiscount;

	return (
		<TouchableOpacity onPress={onPress}>
			<VStack
				backgroundColor="#FFF"
				p={2}
				width={widthPercentage(40)}
				minHeight={widthPercentage(35)}
				justifyContent="center"
				mr={2}
				space={2}
				borderWidth={1}
				borderColor="gray.200"
				my={1}
				borderRadius="5"
				rounded="md"
			>
				<HStack space={1}>
					<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
					<Text fontSize="sm" fontWeight="bold" color={BASE_COLOR.text.primary}>
						{totalCoin}
					</Text>
				</HStack>

				<Text fontSize="xl" fontFamily="lato" fontWeight="bold" color={BASE_COLOR.text.primary}>
					{totalCoin} coin - Disc {discount}%
				</Text>

				<HStack space={1}>
					<FontAwesome5 name="money-bill-wave" size={17} color={BASE_COLOR.text.primary} />
					<Text fontSize="sm" fontFamily="lato" fontWeight="bold" color={BASE_COLOR.text.primary}>
						Rp.{toMoney(percentage)}
					</Text>
				</HStack>

				<Text fontSize="xs" fontWeight="bold" strikeThrough color={BASE_COLOR.text.primary}>
					Rp.{toMoney(price)}
				</Text>
			</VStack>
		</TouchableOpacity>
	);
};
