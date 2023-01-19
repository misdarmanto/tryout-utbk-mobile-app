import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, HStack, Text } from "native-base";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";
import { FontAwesome5 } from "@expo/vector-icons";
import { ButtonPrimary } from "../../components/button/ButtonPrimary";
import { BASE_COLOR } from "../../utilities/baseColor";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes } from "../../types";
import { useContext } from "react";
import { toMoney } from "../../utilities/toMony";
type PymentScreenPropsTypes = NativeStackScreenProps<RootParamList, "Pyment">;

export default function PymentScreen({ navigation }: PymentScreenPropsTypes) {
	const { appInfo } = useContext<ContextApiTypes>(RootContext);

	return (
		<Layout>
			<FlatList
				data={appInfo.payment.priceList}
				keyExtractor={(item) => item.id + ""}
				renderItem={({ item }) => (
					<CardPyment
						onPress={() => navigation.navigate("DetailPayment", { item })}
						totalCoin={item.totalCoin}
						totalAmount={item.totalAmount}
					/>
				)}
			/>
		</Layout>
	);
}

interface CardPymentTpes {
	totalCoin: number;
	totalAmount: number;
	onPress?: any;
}

const CardPyment = ({ totalCoin, totalAmount, onPress }: CardPymentTpes) => {
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
			<ButtonPrimary title="Top Up" onPress={onPress} style={{ paddingHorizontal: 15 }} />
		</HStack>
	);
};
