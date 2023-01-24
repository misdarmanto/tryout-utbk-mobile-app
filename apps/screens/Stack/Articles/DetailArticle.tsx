import React from "react";
import { WebView } from "react-native-webview";
import Layout from "../../../components/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../../navigations";

type DetailArticleScreenPropsTypes = NativeStackScreenProps<RootParamList, "DetailArticle">;

const DetailArticleScreen = ({ route, navigation }: DetailArticleScreenPropsTypes) => {
	const { article } = route.params;

	const HTML = `
    <!doctype html>
    <html lang="en">
        <head>  
            <meta charset="utf-8">
            <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
        </head>
        <body>${article?.text}</body>
    </html>`;

	return (
		<Layout>
			<WebView
				injectedJavaScript="document.body.style.userSelect = 'none'"
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				originWhitelist={["*"]}
				source={{ html: HTML }}
			/>
		</Layout>
	);
};

export default DetailArticleScreen;
