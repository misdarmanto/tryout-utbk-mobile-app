import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text } from "native-base";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";

type PymentScreenPropsTypes = NativeStackScreenProps<RootParamList, "Pyment">;

export default function PymentScreen({ navigation }: PymentScreenPropsTypes) {
	return (
		<Layout>
			<Text>Pyment screen</Text>
			<Button onPress={() => navigation.navigate("Detail")}>Detail</Button>
		</Layout>
	);
}
