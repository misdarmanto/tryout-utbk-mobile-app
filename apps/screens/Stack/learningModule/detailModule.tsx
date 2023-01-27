import React, { useLayoutEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../../navigations";
import RenderWebView from "../../../components/webView/RenderWebView";

type DetailLearningModuleScreenPropsTypes = NativeStackScreenProps<RootParamList, "DetailLearningModule">;

const DetailLearningModuleScreen = ({ route, navigation }: DetailLearningModuleScreenPropsTypes) => {
	const { moduleItem } = route.params;
	useLayoutEffect(() => {
		navigation.setOptions({
			title: moduleItem.title,
		});
	}, []);

	return <RenderWebView htmlBody={moduleItem?.text} />;
};

export default DetailLearningModuleScreen;
