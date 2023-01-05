import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Text, View } from "native-base";
import { RootParamList } from "../../navigations/index";

type TryOutScreenPropsTypes = NativeStackScreenProps<RootParamList, "TryOut">;

export default function TryOutScreen({ navigation }: TryOutScreenPropsTypes) {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>TryOut screen</Text>
		</View>
	);
}
