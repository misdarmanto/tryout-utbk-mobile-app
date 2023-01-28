import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Button, FlatList, HStack, Text } from "native-base";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations";

type HistoryTransactionScreenPropsTypes = NativeStackScreenProps<RootParamList, "HistoryTransaction">;

export default function HistoryTransactionScreen({ navigation }: HistoryTransactionScreenPropsTypes) {
	return (
		<Layout>
			<Text>History Transaction</Text>
		</Layout>
	);
}
