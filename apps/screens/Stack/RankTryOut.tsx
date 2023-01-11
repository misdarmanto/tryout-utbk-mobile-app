import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Button, FlatList, HStack, Text } from "native-base";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";
import { FontAwesome5 } from "@expo/vector-icons";
import { ButtonPrimary } from "../../components/button/ButtonPrimary";
import { BASE_COLOR } from "../../utilities/baseColor";

type RankTryOutScreenPropsTypes = NativeStackScreenProps<RootParamList, "RankTryOut">;

export default function RankTryOutScreen({ navigation }: RankTryOutScreenPropsTypes) {
	const CARD_PYMENT_DATA = [
		{ id: 1, totalCoin: 100, totalAmount: 10000 },
		{ id: 2, totalCoin: 100, totalAmount: 10000 },
		{ id: 3, totalCoin: 100, totalAmount: 10000 },
		{ id: 4, totalCoin: 100, totalAmount: 10000 },
		{ id: 5, totalCoin: 100, totalAmount: 10000 },
		{ id: 6, totalCoin: 100, totalAmount: 10000 },
	];
	return (
		<Layout>
			<FlatList
				data={CARD_PYMENT_DATA}
				keyExtractor={(item) => item.id + ""}
				renderItem={({ item }) => <CardPyment totalCoin={item.totalAmount} totalAmount={item.totalAmount} />}
			/>
		</Layout>
	);
}

interface CardPymentTpes {
	totalCoin: number;
	totalAmount: number;
}

const CardPyment = ({ totalCoin, totalAmount }: CardPymentTpes) => {
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
			<HStack space={3} alignItems="center">
				<Avatar>M</Avatar>
				<Text fontFamily="lora" fontSize="md" color={BASE_COLOR.text.primary}>
					Mac Address
				</Text>
			</HStack>

			<ButtonPrimary title="Beli" style={{ paddingHorizontal: 15 }} />
		</HStack>
	);
};
