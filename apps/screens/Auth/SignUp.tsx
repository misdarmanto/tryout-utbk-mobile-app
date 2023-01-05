import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "native-base";
import { RootParamList } from "../../navigations";

type SignUpScreenPropsTypes = NativeStackScreenProps<RootParamList, "SignUp">;

export default function SignUpScreen({ navigation }: SignUpScreenPropsTypes) {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>SignUp screen</Text>
		</View>
	);
}
