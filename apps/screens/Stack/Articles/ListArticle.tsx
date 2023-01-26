import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, HStack, Text } from "native-base";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations";
import { FontAwesome5 } from "@expo/vector-icons";
import { BASE_COLOR } from "../../../utilities/baseColor";
import {
	getDataFromLocalStorage,
	getExpireTimeFromLocalStorage,
	saveDataToLocalStorage,
	setExpireTimeToLocalStorage,
} from "../../../localStorage/localStorageDB";
import { FirestoreDB } from "../../../firebase/firebaseDB";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { RootContext } from "../../../utilities/rootContext";
import { ContextApiTypes } from "../../../types";
import { ArticleTypes } from "../../../types/articleTypes";
import { TouchableOpacity } from "react-native";

type ListArticleScreenPropsTypes = NativeStackScreenProps<RootParamList, "ListArticle">;

export default function ListArticleScreen({ route, navigation }: ListArticleScreenPropsTypes) {
	const { userInfo, appInfo } = useContext<ContextApiTypes>(RootContext);
	const { categoryArticle } = route.params;

	const [listArticle, setListArticle] = useState<ArticleTypes[]>([]);

	const getListArticle = async () => {
		const ARTICLE_KEY = `article_key_${categoryArticle}`;
		const EXPIRE_KEY = `article_expire_time_key${categoryArticle}`;

		const articleFromLocalStorage = await getDataFromLocalStorage({ key: ARTICLE_KEY });
		const expireTime = await getExpireTimeFromLocalStorage({ key: EXPIRE_KEY });

		const currentDateTime = Date.now();
		const hasExpired = expireTime >= currentDateTime;

		if (articleFromLocalStorage && hasExpired) {
			return articleFromLocalStorage;
		}

		const ArticleDB = new FirestoreDB("Article");
		const articleFromDB = await ArticleDB.queryCollection({
			params_1: "category",
			params_2: categoryArticle,
		});

		await saveDataToLocalStorage({ key: ARTICLE_KEY, item: articleFromDB });
		await setExpireTimeToLocalStorage({
			key: EXPIRE_KEY,
			time: appInfo.tryOutSettings.cacheExpireTimeInMinute || 5,
		});
		return articleFromDB;
	};

	useEffect(() => {
		(async () => {
			const result = await getListArticle();
			console.log(result);
			setListArticle(result);
		})();
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: categoryArticle,
		});
	}, []);

	const handleNavigateToDetailScreen = (article: any) => {
		navigation.navigate("DetailArticle", { article: article });
	};

	return (
		<Layout>
			<FlatList
				data={listArticle}
				keyExtractor={(item) => item.id + ""}
				renderItem={({ item }) => (
					<ListArticleItem title={item.title} onPress={() => handleNavigateToDetailScreen(item)} />
				)}
			/>
		</Layout>
	);
}

const ListArticleItem = ({ title, onPress }: { title: string; onPress: any }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<HStack
				backgroundColor="#FFF"
				p={5}
				alignItems="center"
				justifyContent="space-between"
				borderWidth={1}
				borderColor="gray.200"
				my={1}
				borderRadius="5"
				rounded="md"
			>
				<HStack space={3} alignItems="center">
					<FontAwesome5 name="book" size={24} color={BASE_COLOR.text.primary} />
					<Text fontFamily="lato" fontSize="md" color={BASE_COLOR.text.primary}>
						{title}
					</Text>
				</HStack>
			</HStack>
		</TouchableOpacity>
	);
};
