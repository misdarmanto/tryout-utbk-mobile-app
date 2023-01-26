import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Button, FlatList, HStack, Text } from "native-base";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations";

type DetailPaymentAdsScreenPropsTypes = NativeStackScreenProps<RootParamList, "DetailPaymentAds">;

export default function DetailPaymentAdsScreen({ navigation }: DetailPaymentAdsScreenPropsTypes) {
	return (
		<Layout>
			<Text>Detail Ads</Text>
		</Layout>
	);
}
