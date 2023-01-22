import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, HStack, Text, Heading, ScrollView, Pressable } from "native-base";
import { CardTryOut, CardTryOutTypes } from "../../components/card/CardTryOut";
import Layout from "../../components/Layout";
import { FontAwesome5, MaterialIcons, Fontisto, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { RootParamList } from "../../navigations";
import { RefreshControl, TouchableOpacity } from "react-native";
import { BASE_COLOR } from "../../utilities/baseColor";
import { useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import SkeletonHomeScreen from "../../components/skeleton/HomeScreenSkeleton";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes } from "../../types";
import { TryOutDataTypes } from "../../types/tryOutDataTypes";
import { FirestoreDB } from "../../firebase/firebaseDB";
import { widthPercentage } from "../../utilities/dimension";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HomeScreenPropsTypes = NativeStackScreenProps<RootParamList, "Home">;

export default function HomeScreen({ navigation }: HomeScreenPropsTypes) {
	const { userInfo, appInfo } = useContext<ContextApiTypes>(RootContext);
	const [tryOutHighlight, setTryOutHighlight] = useState<TryOutDataTypes[]>([]);
	const [isLoading, setIsLoading] = useState(true);

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

	const getTryOutHighlight = async () => {
		const TRYOUT_KEY = "tryOutHighLight_key";
		const EXPIRE_KEY = "tryOutHighLight_expire_time";

		const checkLocalStorage = await getDataFromLocalStorage({ key: TRYOUT_KEY });
		const expireTime = await getExpireTimeFromLocalStorage({ key: EXPIRE_KEY });

		const currentDateTime = Date.now();
		const isExpire = expireTime >= currentDateTime;

		if (checkLocalStorage && isExpire) {
			setTryOutHighlight(checkLocalStorage);
			console.log("get data highlight from local storage");
		} else {
			const tryOutDB = new FirestoreDB("TryOut");
			const data = await tryOutDB.queryCollection({ params_1: "isHighlight", params_2: true });
			setTryOutHighlight(data);

			await saveDataToLocalStorage({ key: TRYOUT_KEY, item: data });
			await setExpireTimeToLocalStorage({
				key: EXPIRE_KEY,
				time: appInfo.tryOutSettings.cacheExpireTimeInMinute || 5,
			});
			console.log("get data highlight from firebase");
		}
	};

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			await getTryOutHighlight();
			setIsLoading(false);
		})();
	}, []);

	const onRefresh = useCallback(async () => {
		await getTryOutHighlight();
	}, []);

	const handleCardOnPress = (item: TryOutDataTypes) => {
		if (!userInfo.isAuth) {
			navigation.navigate("Login");
			return;
		}
		const newItem = item.questions.map((item: any) => ({ ...item, answer: "" }));
		item.questions = newItem;
		navigation.navigate("TryOut", { tryOutData: item });
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "",
			headerLeft: () => (
				<HStack px="2" alignItems="center" space={2}>
					<Text color={BASE_COLOR.text.primary} fontSize="xl">
						{userInfo.isAuth ? `Hi, ${userInfo.name}` : "Welcome"}
					</Text>
				</HStack>
			),
			headerRight: () => (
				<HStack px="3" alignItems="center" space={2}>
					{userInfo.isAuth && (
						<TouchableOpacity onPress={() => navigation.navigate("Notification")}>
							<Ionicons name="ios-notifications" size={25} color={BASE_COLOR.text.primary} />
							{userInfo.notifications?.length !== 0 && (
								<Box
									rounded="full"
									backgroundColor="red.500"
									top="0"
									right="0"
									p="2"
									position="absolute"
									zIndex="2"
								/>
							)}
						</TouchableOpacity>
					)}
					{!userInfo.isAuth && (
						<Pressable
							borderWidth="1"
							borderColor={BASE_COLOR.text.primary}
							px="2"
							mx="2"
							p="1"
							rounded="md"
							onPress={() => navigation.navigate("Login")}
							_pressed={{
								backgroundColor: BASE_COLOR.blue[100],
							}}
						>
							<Text color={BASE_COLOR.text.primary} fontSize="md" fontWeight="bold">
								Login
							</Text>
						</Pressable>
					)}
				</HStack>
			),
		});
	}, [userInfo.isAuth]);

	const IconRounded = ({ Icon, title }: { Icon: any; title: string }) => {
		const handleIconOnPress = () => {
			if (!userInfo.isAuth) {
				navigation.navigate("Login");
				return;
			}
			navigation.navigate("DetailTryOut");
		};

		return (
			<TouchableOpacity onPress={handleIconOnPress} activeOpacity={0.8}>
				<Box backgroundColor={BASE_COLOR.primary} rounded="full" p={5}>
					{Icon}
				</Box>
				<Text
					textAlign="center"
					fontFamily="lato"
					mt="1"
					fontSize="xs"
					color={BASE_COLOR.text.primary}
					lineHeight="xs"
					width={widthPercentage(16)}
				>
					{title}
				</Text>
			</TouchableOpacity>
		);
	};

	const handleOnTopUpPress = () => {
		if (!userInfo.isAuth) {
			navigation.navigate("Login");
			return;
		}
		navigation.navigate("Pyment");
	};

	return (
		<Layout>
			{isLoading && <SkeletonHomeScreen />}
			{!isLoading && (
				<ScrollView
					showsVerticalScrollIndicator={false}
					refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
				>
					<Banner
						countDown={appInfo.banner.countDown}
						coin={userInfo.coin}
						onTopUpPress={handleOnTopUpPress}
					/>
					<Box
						borderWidth={1}
						my="5"
						p="3"
						backgroundColor="white"
						borderColor="gray.200"
						borderRadius="5"
						rounded="md"
					>
						<HStack my="3" flexWrap="wrap" justifyContent="space-between">
							<IconRounded
								Icon={<FontAwesome5 name="brain" size={25} color="#FFF" />}
								title="penalaran umum"
							/>
							<IconRounded
								Icon={<FontAwesome5 name="square-root-alt" size={25} color="#FFF" />}
								title="matematika"
							/>
							<IconRounded
								Icon={<MaterialCommunityIcons name="virus" size={25} color="#FFF" />}
								title="Biologi"
							/>

							<IconRounded
								Icon={<Fontisto name="atom" size={25} color="#FFF" />}
								title="Fisika"
							/>
						</HStack>

						<HStack my="3" flexWrap="wrap" justifyContent="space-between">
							<IconRounded
								Icon={<FontAwesome5 name="brain" size={25} color="#FFF" />}
								title="Bahasa Inggris"
							/>
							<IconRounded
								Icon={<Fontisto name="atom" size={25} color="#FFF" />}
								title="Geograpi"
							/>
							<IconRounded
								Icon={<FontAwesome5 name="square-root-alt" size={25} color="#FFF" />}
								title="Bahasa Indonesia"
							/>
							<IconRounded
								Icon={<MaterialCommunityIcons name="virus" size={25} color="#FFF" />}
								title="Sejarah"
							/>
						</HStack>
					</Box>

					<Heading mt="5" color={BASE_COLOR.text.primary} fontFamily="lato" fontStyle="italic">
						Recomend
					</Heading>

					{tryOutHighlight.map((item) => (
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
					))}
				</ScrollView>
			)}
		</Layout>
	);
}

interface BannerTypes {
	onTopUpPress?: any;
	countDown?: string;
	coin: number;
}

const Banner = ({ onTopUpPress, countDown, coin }: BannerTypes) => {
	return (
		<Box bg={BASE_COLOR.primary} p="2" borderRadius="5" rounded="md">
			<HStack justifyContent="space-between">
				<Box justifyContent="space-between">
					{countDown && (
						<Text fontSize="sm" color="white" pb="3">
							{countDown}
						</Text>
					)}

					<HStack space={2}>
						<HStack space={1}>
							<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
							<Text fontSize="sm" fontWeight="bold" color="white">
								{coin}
							</Text>
						</HStack>
						<TouchableOpacity onPress={onTopUpPress}>
							<HStack space={1}>
								<MaterialIcons name="add-box" size={24} color="#fff" />
								<Text fontSize="sm" fontWeight="bold" color="white">
									Top Up
								</Text>
							</HStack>
						</TouchableOpacity>
					</HStack>
				</Box>
			</HStack>
		</Box>
	);
};
