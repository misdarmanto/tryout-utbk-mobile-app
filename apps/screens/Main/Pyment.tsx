import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Heading, HStack, ScrollView, Text, VStack } from "native-base";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";
import { FontAwesome5 } from "@expo/vector-icons";
import { BASE_COLOR } from "../../utilities/baseColor";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes } from "../../types";
import { useContext } from "react";
import { toMoney } from "../../utilities/toMony";
import { TouchableOpacity } from "react-native";
import { heightPercentage, widthPercentage } from "../../utilities/dimension";

type PymentScreenPropsTypes = NativeStackScreenProps<RootParamList, "Pyment">;

export default function PymentScreen({ navigation }: PymentScreenPropsTypes) {
	const { appInfo, userInfo } = useContext<ContextApiTypes>(RootContext);

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
							<Heading color={BASE_COLOR.text.primary}>{userInfo.name}</Heading>
							<Text color={BASE_COLOR.text.primary}>{userInfo.email}</Text>
						</VStack>
					</HStack>
					<HStack space={1} alignItems="center">
						<FontAwesome5 name="bitcoin" size={32} color="#FFD700" />
						<Text fontSize="sm" fontWeight="bold" color={BASE_COLOR.text.primary}>
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
					<Text fontSize="md" fontFamily="lato" fontWeight="bold" color={BASE_COLOR.text.primary}>
						Lihat Iklan untuk mendapatkan 5 koin
					</Text>
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
							onPress={() => navigation.navigate("DetailPaymentAds")}
						>
							<Text style={{ color: "#FFF", fontSize: 15 }}>Lihat</Text>
						</TouchableOpacity>
					</HStack>
				</VStack>

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
					<Text fontSize="md" fontFamily="lato" fontWeight="bold" color={BASE_COLOR.text.primary}>
						Undang teman mu untuk mendapatkan 50 koin
					</Text>
					<Text fontSize="sm" color={BASE_COLOR.text.primary}>
						Salin kode referral mu dibawah ini dan share ke teman mu, pastikan teman mu memasukan
						kode referral tersebut pada saat melakukan pendaftaran
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
