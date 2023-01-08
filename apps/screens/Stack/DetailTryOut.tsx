import { Text } from "native-base";
import Layout from "../../components/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations";

type DetailTryOutScreenPropsTypes = NativeStackScreenProps<RootParamList, "DetailTryOut">;

const DetailTryOutScreen = ({ navigation }: DetailTryOutScreenPropsTypes) => {
	return (
		<Layout>
			<Text>Detail</Text>
		</Layout>
	);
};

export default DetailTryOutScreen;
