import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations";
import { RootContext } from "../../../utilities/rootContext";
import { ContextApiTypes, TransactionHistoryTypes } from "../../../types";

import { FlatList, HStack, Text, VStack } from "native-base";
import { BASE_COLOR } from "../../../utilities/baseColor";
import { FontAwesome5 } from "@expo/vector-icons";
import { toMoney } from "../../../utilities/toMony";
import EmptyAnimation from "../../../components/animations/Empty";
import { FirestoreDB } from "../../../firebase/firebaseDB";
import {
	getDataFromLocalStorage,
	removeDataFromLocalStorage,
	saveDataToLocalStorage,
} from "../../../localStorage/localStorageDB";
import ListSkeleton from "../../../components/skeleton/ListSkeleton";

type TransactionHistoryScreenPropsTypes = NativeStackScreenProps<RootParamList, "TransactionHistory">;

export default function TransactionHistoryScreen({ navigation }: TransactionHistoryScreenPropsTypes) {
	const { userInfo } = useContext<ContextApiTypes>(RootContext);
	const { setUserInfo }: any = useContext(RootContext);
	const [isLoading, setIsLoading] = useState(true);

	const [listTransactionHistory, setListTransactionHistory] = useState<TransactionHistoryTypes[]>([]);

	const LOCALSTORAGE_TRANSACTION_HISTORY__KEY = `transaction_history_${userInfo.email}`;

	const removeTransactionHistoryFromFirestore = async () => {
		const UserDB = new FirestoreDB("User");
		await UserDB.update({ documentId: userInfo.email, newData: { transactionHistory: [] } });
	};

	const updateNotificationFromLocalStorage = async (newTransaction: any) => {
		await removeDataFromLocalStorage({ key: LOCALSTORAGE_TRANSACTION_HISTORY__KEY });
		await saveDataToLocalStorage({
			key: LOCALSTORAGE_TRANSACTION_HISTORY__KEY,
			item: newTransaction,
		});
		await removeTransactionHistoryFromFirestore();
	};

	const updateUserInfo = () => {
		setUserInfo({ ...userInfo, transactionHistory: [] });
	};

	useEffect(() => {
		(async () => {
			const localTransactionHistory =
				(await getDataFromLocalStorage({ key: LOCALSTORAGE_TRANSACTION_HISTORY__KEY })) || [];

			if (userInfo.transactionHistory.length === 0) {
				localTransactionHistory.sort((a: any, b: any) => parseInt(b.id) - parseInt(a.id));
				setListTransactionHistory(localTransactionHistory);
			}

			if (userInfo.transactionHistory.length !== 0) {
				const newData = [...localTransactionHistory, ...userInfo.transactionHistory];
				newData.sort((a: any, b: any) => parseInt(b.id) - parseInt(a.id));
				setListTransactionHistory(newData);
				await updateNotificationFromLocalStorage(newData);
				updateUserInfo();
			}

			setIsLoading(false);
		})();
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "history pembelian",
		});
	}, []);

	if (isLoading) return <ListSkeleton />;

	return (
		<Layout>
			{listTransactionHistory.length === 0 && <EmptyAnimation title="Belum melakukan pembelian" />}
			{listTransactionHistory.length !== 0 && (
				<FlatList
					data={listTransactionHistory}
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
