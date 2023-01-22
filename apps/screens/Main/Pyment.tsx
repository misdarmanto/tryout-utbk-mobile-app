import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HStack, ScrollView, Text, VStack } from "native-base";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";
import { FontAwesome5 } from "@expo/vector-icons";
import { BASE_COLOR } from "../../utilities/baseColor";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes } from "../../types";
import { useContext } from "react";
import { toMoney } from "../../utilities/toMony";
import { TouchableOpacity } from "react-native";

type PymentScreenPropsTypes = NativeStackScreenProps<RootParamList, "Pyment">;

export default function PymentScreen({ navigation }: PymentScreenPropsTypes) {
	const { appInfo } = useContext<ContextApiTypes>(RootContext);

	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<VStack
					backgroundColor="#FFF"
					px={5}
					py={2}
					borderWidth={1}
					borderColor="gray.200"
					my={1}
					space={1}
					borderRadius="5"
					rounded="md"
				>
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
						>
							<Text style={{ color: "#FFF", fontSize: 15 }}>Detail</Text>
						</TouchableOpacity>
					</HStack>
					<Text fontWeight="bold" color={BASE_COLOR.text.primary}>
						Lihat Iklan untuk mendapatkan 5 koin
					</Text>
				</VStack>

				<VStack
					backgroundColor="#FFF"
					px={5}
					py={2}
					borderWidth={1}
					borderColor="gray.200"
					my={1}
					space={1}
					borderRadius="5"
					rounded="md"
				>
					<HStack justifyContent="space-between">
						<HStack space={1}>
							<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
							<Text fontSize="sm" fontWeight="bold" color={BASE_COLOR.text.primary}>
								{50} coin
							</Text>
						</HStack>
						<TouchableOpacity
							style={{
								backgroundColor: BASE_COLOR.primary,
								padding: 5,
								paddingHorizontal: 10,
								borderRadius: 5,
							}}
						>
							<Text style={{ color: "#FFF", fontSize: 15 }}>Detail</Text>
						</TouchableOpacity>
					</HStack>
					<Text fontWeight="bold" color={BASE_COLOR.text.primary}>
						Undang teman mu untuk mendapatkan 50 koin
					</Text>
				</VStack>

				{appInfo.payment.priceList.map((item, index: number) => {
					return (
						<CardPyment
							key={index}
							title="Detail"
							onPress={() => navigation.navigate("DetailPayment", { item })}
							totalCoin={item.totalCoin}
							totalAmount={item.totalPrice}
						/>
					);
				})}
			</ScrollView>
		</Layout>
	);
}

interface CardPymentTpes {
	title?: string;
	totalCoin: number;
	totalAmount: number;
	onPress?: any;
}

const CardPyment = ({ title = "Top Up", totalCoin, totalAmount, onPress }: CardPymentTpes) => {
	return (
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
			<HStack space={1}>
				<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
				<Text fontSize="sm" fontWeight="bold" color={BASE_COLOR.text.primary}>
					{totalCoin}
				</Text>
			</HStack>
			<HStack space={1}>
				<FontAwesome5 name="money-bill-wave" size={24} color={BASE_COLOR.text.primary} />
				<Text fontSize="sm" fontWeight="bold" color={BASE_COLOR.text.primary}>
					Rp.{toMoney(totalAmount)}
				</Text>
			</HStack>
			<TouchableOpacity
				onPress={onPress}
				style={{
					backgroundColor: BASE_COLOR.primary,
					padding: 5,
					paddingHorizontal: 10,
					borderRadius: 5,
				}}
			>
				<Text style={{ color: "#FFF", fontSize: 15 }}>{title}</Text>
			</TouchableOpacity>
		</HStack>
	);
};
