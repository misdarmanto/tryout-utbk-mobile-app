import { Text } from "native-base";
import Layout from "../../components/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations";
import { MathJaxSvg } from "react-native-mathjax-html-to-svg";

type DetailTryOutScreenPropsTypes = NativeStackScreenProps<RootParamList, "DetailTryOut">;

const DetailTryOutScreen = ({ navigation }: DetailTryOutScreenPropsTypes) => {
	return (
		<Layout>
			<Text>Detail</Text>
		</Layout>
	);
};

function MathSymbol() {
	return (
		<MathJaxSvg fontSize={16} color="red" fontCache={true}>
			{"$$4sen()cos^2(/2)$$"}
		</MathJaxSvg>
	);
}

export default DetailTryOutScreen;
