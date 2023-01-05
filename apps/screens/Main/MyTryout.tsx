import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "native-base";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";

type MyTryOutPropsTypes = NativeStackScreenProps<RootParamList, "MyTryOut">;

export default function MyTryOutScreen({ navigation }: MyTryOutPropsTypes) {
	return (
		<Layout>
			<Text>MyTryOut screen</Text>
		</Layout>
	);
}
