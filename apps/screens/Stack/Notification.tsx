import { Text } from "native-base";
import Layout from "../../components/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations";

type NotificationScreenPropsTypes = NativeStackScreenProps<RootParamList, "Notification">;

const NotificationScreen = ({ navigation }: NotificationScreenPropsTypes) => {
	return (
		<Layout>
			<Text>Notification</Text>
		</Layout>
	);
};

export default NotificationScreen;
