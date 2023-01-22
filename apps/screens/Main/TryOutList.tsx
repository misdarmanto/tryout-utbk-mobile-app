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

type ExercisesPropsTypes = NativeStackScreenProps<RootParamList, "TryOutList">;

export default function TryOutListScreen({ navigation }: ExercisesPropsTypes) {
	const { userInfo, appInfo } = useContext<ContextApiTypes>(RootContext);
	const [tryOutList, setTryOutList] = useState<TryOutDataTypes[]>([]);
	const [tryoutData, setTryOutData] = useState<TryOutDataTypes[]>(tryOutList);

	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("All");

	const saveDataToLocalStorage = async ({ key, item }: { key: string; item: any }) => {
		try {
			const data = JSON.stringify(item);
			await AsyncStorage.setItem(key, data);
		} catch (error: any) {
			console.log(error);
			return error;
		}
	};

	const getDataFromLocalStorage = async ({ key }: { key: string }) => {
		try {
			const result = await AsyncStorage.getItem(key);
			return result != null ? JSON.parse(result) : null;
		} catch (error: any) {
			console.log(error);
			return error;
		}
	};

	const setExpireTimeToLocalStorage = async ({ time, key }: { time: number; key: string }) => {
		const timeInMilliSecond = 60000;
		const timeInMinute = timeInMilliSecond * time;
		const expireUntile = timeInMinute;

		const currentDateTimeInMilliSecond = Date.now() + expireUntile + "";
		await AsyncStorage.setItem(key, currentDateTimeInMilliSecond);
	};

	const getExpireTimeFromLocalStorage = async ({ key }: { key: string }) => {
		const result = await AsyncStorage.getItem(key);
		return result != null ? JSON.parse(result) : 0;
	};

	useEffect(() => {
		(async () => {
			const TRYOUT_DATA_KEY = "tryOutData_key";
			const EXPIRE_KEY = "expire_time";

			const checkLocalStorage = await getDataFromLocalStorage({ key: TRYOUT_DATA_KEY });
			const expireTime = await getExpireTimeFromLocalStorage({ key: EXPIRE_KEY });
			const currentDateTime = Date.now();
			const isExpire = expireTime >= currentDateTime;

			if (checkLocalStorage && isExpire) {
				setTryOutList(checkLocalStorage);
				setTryOutData(checkLocalStorage);
				console.log("get data from local storage");
			} else {
				const tryOutDB = new FirestoreDB("TryOut");
				const tryOut = await tryOutDB.getCollection();

				setTryOutList(tryOut);
				setTryOutData(tryOut);

				await saveDataToLocalStorage({ key: TRYOUT_DATA_KEY, item: tryOut });
				await setExpireTimeToLocalStorage({
					key: EXPIRE_KEY,
					time: appInfo.tryOutSettings.cacheExpireTimeInMinute || 60,
				});
				console.log("get data from firebase");
			}

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

	const handleCardOnPress = () => {
		if (!userInfo.isAuth) {
			navigation.navigate("Login");
			return;
		}
		navigation.navigate("DetailTryOut");
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

	const RenderListItem = ({ item }: any) => {
		return (
			<CardTryOut
				onPress={handleCardOnPress}
				coinTotal={item.coin}
				isFree={item.coin === 0}
				exampTotal={item.total}
				title={item.title}
				id={item.id}
				time={item.time}
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
			<Button
				onPress={async () => {
					await AsyncStorage.multiRemove(["tryOutData_key", "expire_time"]);
				}}
			>
				Clear
			</Button>
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
