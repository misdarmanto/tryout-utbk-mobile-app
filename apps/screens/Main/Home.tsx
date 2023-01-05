import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "native-base";
import { Card } from "../../components/Card";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";

type HomeScreenPropsTypes = NativeStackScreenProps<RootParamList, "Home">;

export default function HomeScreen({ navigation }: HomeScreenPropsTypes) {
	return (
		<Layout>
			<Card />
		</Layout>
	);
}
