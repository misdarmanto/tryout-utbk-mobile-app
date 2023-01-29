import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, Button, FlatList, Heading, HStack, ScrollView } from "native-base";
import { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { CardTryOut, CardTryOutTypes } from "../../components/card/CardTryOut";
import Layout from "../../components/Layout";
import TryOutScreenSkeleton from "../../components/skeleton/TryOutScreenSkeleton";
import { RootParamList } from "../../navigations";
import { BASE_COLOR } from "../../utilities/baseColor";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes } from "../../types";
import { FirestoreDB } from "../../firebase/firebaseDB";
import { TryOutDataTypes } from "../../types/tryOutDataTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	saveDataToLocalStorage,
	getDataFromLocalStorage,
	getExpireTimeFromLocalStorage,
	setExpireTimeToLocalStorage,
} from "../../localStorage/localStorageDB";

type ExercisesPropsTypes = NativeStackScreenProps<RootParamList, "TryOutList">;

export default function TryOutListScreen({ navigation }: ExercisesPropsTypes) {
	const { userInfo, appInfo } = useContext<ContextApiTypes>(RootContext);
	const [tryOutList, setTryOutList] = useState<TryOutDataTypes[]>([]);
	const [tryoutData, setTryOutData] = useState<TryOutDataTypes[]>(tryOutList);

	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("All");

	const getTryOutCollections = async () => {
		const TRYOUT_DATA_KEY = "tryOutData_key";
		const EXPIRE_KEY = "expire_time";

		const tryOutCollectionFromLocalStorage = await getDataFromLocalStorage({ key: TRYOUT_DATA_KEY });
		const expireTime = await getExpireTimeFromLocalStorage({ key: EXPIRE_KEY });

		const currentDateTime = Date.now();
		const hasExpired = expireTime >= currentDateTime;

		if (tryOutCollectionFromLocalStorage && hasExpired) {
			return tryOutCollectionFromLocalStorage;
		}

		const tryOutDB = new FirestoreDB("TryOut");
		const tryOutCollectionsFromDB = await tryOutDB.getCollection();

		await saveDataToLocalStorage({ key: TRYOUT_DATA_KEY, item: tryOutCollectionsFromDB });
		await setExpireTimeToLocalStorage({
			key: EXPIRE_KEY,
			time: appInfo.tryOutSettings.cacheExpireTimeInMinute || 60,
		});

		return tryOutCollectionsFromDB;
	};

	useEffect(() => {
		(async () => {
			const result = await getTryOutCollections();
			setTryOutData(result);
			setTryOutList(result);
			setIsLoading(false);
		})();
	}, []);

	const onRefresh = useCallback(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 100);
	}, []);

	const handleSelectTab = (category: string) => {
		setActiveTab(category);
		if (category === "All") {
			setTryOutData(tryOutList);
			return;
		}
		const newTab = tryOutList.filter((item: CardTryOutTypes | any) => item.category === category);
		setTryOutData(newTab);
	};

	const Tab = () => {
		const TAB_HEADER_NAMES = appInfo.tryOutSettings.categories;
		return (
			<ScrollView showsHorizontalScrollIndicator={false} horizontal>
				<HStack alignItems="center" justifyContent="space-between" px={1} py={5}>
					{TAB_HEADER_NAMES.map((name, index) => (
						<RenderTabHeader
							key={index}
							isActive={activeTab === name}
							onPress={() => handleSelectTab(name)}
							title={name}
						/>
					))}
				</HStack>
			</ScrollView>
		);
	};

	const handleCardOnPress = (item: TryOutDataTypes) => {
		if (!userInfo.isAuth) {
			navigation.navigate("Login");
			return;
		}
		const newItem = item.questions.map((item: any) => ({ ...item, answer: "" }));
		item.questions = newItem;
		navigation.navigate("TryOut", { tryOutData: item });
	};

	const RenderListItem = ({ item }: any) => {
		return (
			<CardTryOut
				key={item.id}
				coinTotal={item.coin}
				isFree={item.coin === 0}
				exampTotal={item.total}
				title={item.title}
				id={item.id}
				time={item.time}
				onPress={() => handleCardOnPress(item)}
			/>
		);
	};

	return (
		<Layout>
			{isLoading && <TryOutScreenSkeleton />}
			{!isLoading && (
				<FlatList
					refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
					showsVerticalScrollIndicator={false}
					ListHeaderComponent={() => <Tab />}
					data={tryoutData}
					keyExtractor={(item) => item.id + ""}
					renderItem={({ item }) => <RenderListItem item={item} />}
				/>
			)}
		</Layout>
	);
}

interface RenderTabHeaderTypes {
	title: string;
	onPress?: any;
	isActive: boolean;
}

const RenderTabHeader = ({ title, onPress, isActive }: RenderTabHeaderTypes) => (
	<Box
		backgroundColor="#FFF"
		px="5"
		p="2"
		mx="1"
		borderWidth="1"
		borderColor={isActive ? BASE_COLOR.primary : "gray.300"}
		borderRadius="full"
	>
		<Heading
			fontFamily="lato"
			fontSize="md"
			color={isActive ? BASE_COLOR.primary : BASE_COLOR.text.primary}
			onPress={onPress}
		>
			{title}
		</Heading>
	</Box>
);
