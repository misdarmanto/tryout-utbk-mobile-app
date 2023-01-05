import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "native-base";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";

type ProfilePropsTypes = NativeStackScreenProps<RootParamList, "Profile">;

export default function ProfileScreen({ navigation }: ProfilePropsTypes) {
	return (
		<Layout>
			<Text>Home screen</Text>
			<Button onPress={() => navigation.navigate("Detail")}>Detail</Button>
		</Layout>
	);
}
