import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Button, FlatList, HStack, Text } from "native-base";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations";

type DetailPaymentReferralScreenPropsTypes = NativeStackScreenProps<RootParamList, "DetailPaymentReferral">;

export default function DetailPaymentReferralScreen({ navigation }: DetailPaymentReferralScreenPropsTypes) {
	return (
		<Layout>
			<Text>Detail Ads</Text>
		</Layout>
	);
}
