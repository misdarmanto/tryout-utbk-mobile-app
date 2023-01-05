import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "native-base";
import { RootParamList } from "../../navigations";

type LoginScreenPropsTypes = NativeStackScreenProps<RootParamList, "Login">;

export default function LoginScreen({ navigation }: LoginScreenPropsTypes) {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>Login screen</Text>
		</View>
	);
}
