import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect } from "react";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations";
import { RootContext } from "../../../utilities/rootContext";
import { ContextApiTypes, TransactionHistoryTypes } from "../../../types";

import { FlatList, HStack, Text, VStack } from "native-base";
import { BASE_COLOR } from "../../../utilities/baseColor";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { toMoney } from "../../../utilities/toMony";
import EmptyAnimation from "../../../components/animations/Empty";

type TransactionHistoryScreenPropsTypes = NativeStackScreenProps<RootParamList, "TransactionHistory">;

export default function TransactionHistoryScreen({ navigation }: TransactionHistoryScreenPropsTypes) {
	const { userInfo } = useContext<ContextApiTypes>(RootContext);
	const transactionHistory: any[] = userInfo.transactionHistory;
	transactionHistory.sort((a: any, b: any) => +b.id - +a.id);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "history pembelian",
		});
	}, []);

	return (
		<Layout>
			{transactionHistory.length === 0 && <EmptyAnimation title="Belum melakukan pembelian" />}
			{transactionHistory.length !== 0 && (
				<FlatList
					data={transactionHistory}
					keyExtractor={(item: TransactionHistoryTypes) => item.id}
					renderItem={({ item }) => (
						<VStack
							backgroundColor={"#FFF"}
							my="1"
							minH="16"
							borderWidth="1"
							borderColor="gray.200"
							p="2"
							justifyContent="space-between"
						>
							<HStack space={2} justifyContent="space-between">
								<HStack space={1} alignItems="center">
									<Text fontSize="16" color={BASE_COLOR.text.primary}>
										{item.coin}
									</Text>
									<FontAwesome5 name="bitcoin" size={20} color="#FFD700" />
								</HStack>

								{item.status === "succsess" && (
									<Text fontSize="16" color={BASE_COLOR.green}>
										Berhasil
									</Text>
								)}

								{item.status === "fail" && (
									<Text fontSize="16" color={BASE_COLOR.red[200]}>
										Gagal
									</Text>
								)}
							</HStack>

							<HStack justifyContent="space-between">
								<Text fontSize="11" color={BASE_COLOR.text.primary}>
									Rp.{toMoney(item.price)}
								</Text>
								<Text fontSize="11" color={BASE_COLOR.text.primary}>
									{item.createdAt}
								</Text>
							</HStack>
						</VStack>
					)}
				/>
			)}
		</Layout>
	);
}
