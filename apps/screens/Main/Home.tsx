import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, HStack, Text, Heading, ScrollView } from "native-base";
import { CardTryOut, CardTryOutTypes } from "../../components/card/CardTryOut";
import Layout from "../../components/Layout";
import { FontAwesome5, MaterialIcons, Fontisto, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { RootParamList } from "../../navigations";
import { RefreshControl, TouchableOpacity } from "react-native";
import { BASE_COLOR } from "../../utilities/baseColor";
import { PropsWithChildren, useCallback, useContext, useEffect, useLayoutEffect, useState } from "react";
import SkeletonHomeScreen from "../../components/skeleton/HomeScreenSkeleton";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes } from "../../types/contextApiTypes";

type HomeScreenPropsTypes = NativeStackScreenProps<RootParamList, "Home">;

export default function HomeScreen({ navigation }: HomeScreenPropsTypes) {
	const { userInfo, appInfo } = useContext<ContextApiTypes>(RootContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		console.log(isLoading);
	}, []);

	const onRefresh = useCallback(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	const handleCardOnPress = (isFinish: boolean | any) => {
		if (isFinish) {
			navigation.navigate("RankTryOut");
		} else {
			navigation.navigate("TryOut");
		}
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			title: "",
			headerLeft: () => (
				<HStack px="2" alignItems="center" space={2}>
					<Text color={BASE_COLOR.text.primary} fontSize="xl">
						Hi, {userInfo.name}
					</Text>
				</HStack>
			),
			headerRight: () => (
				<HStack px="3" alignItems="center" space={2}>
					<TouchableOpacity onPress={() => navigation.navigate("Notification")}>
						<Ionicons name="ios-notifications" size={30} color={BASE_COLOR.text.primary} />
					</TouchableOpacity>
				</HStack>
			),
		});
	}, []);

	const IconRounded: React.FC<PropsWithChildren> = ({ children }) => {
		return (
			<TouchableOpacity onPress={() => navigation.navigate("DetailTryOut")} activeOpacity={0.8}>
				<Box backgroundColor={BASE_COLOR.primary} rounded="full" p={5}>
					{children}
				</Box>
			</TouchableOpacity>
		);
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
						countDown={appInfo.countDown}
						coin={userInfo.coin}
						onTopUpPress={() => navigation.navigate("Pyment")}
					/>
					<Box
						borderWidth={1}
						my="5"
						p="5"
						backgroundColor="white"
						borderColor="gray.200"
						borderRadius="5"
						rounded="md"
					>
						<HStack my="3" flexWrap="wrap" justifyContent="space-between">
							<IconRounded>
								<FontAwesome5 name="brain" size={30} color="#FFF" />
							</IconRounded>
							<IconRounded>
								<FontAwesome5 name="square-root-alt" size={30} color="#FFF" />
							</IconRounded>
							<IconRounded>
								<MaterialCommunityIcons name="virus" size={30} color="#FFF" />
							</IconRounded>
							<IconRounded>
								<Fontisto name="atom" size={30} color="#FFF" />
							</IconRounded>
						</HStack>
						<HStack my="3" flexWrap="wrap" justifyContent="space-between">
							<IconRounded>
								<FontAwesome5 name="brain" size={30} color="#FFF" />
							</IconRounded>
							<IconRounded>
								<FontAwesome5 name="square-root-alt" size={30} color="#FFF" />
							</IconRounded>
							<IconRounded>
								<MaterialCommunityIcons name="virus" size={30} color="#FFF" />
							</IconRounded>
							<IconRounded>
								<Fontisto name="atom" size={30} color="#FFF" />
							</IconRounded>
						</HStack>
					</Box>

					<Heading mt="5" color={BASE_COLOR.text.primary} fontFamily="lato" fontStyle="italic">
						Recomend
					</Heading>

					{cardData.map((item) => (
						<CardTryOut key={item.id} {...item} onPress={() => handleCardOnPress(item.isFinish)} />
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
					<Text fontSize="sm" color="white" pb="3">
						{countDown} menuju utbk
					</Text>

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

const cardData: CardTryOutTypes[] = [
	{
		id: 1,
		title: "Tryout UTBK Saintek #1",
		enrollTotal: 1000,
		exampTotal: 50,
		isFree: true,
		isFinish: false,
	},
	{
		id: 2,
		title: "Tryout UTBK Saintek #2",
		enrollTotal: 1000,
		exampTotal: 50,
		coinTotal: 300,
		isFree: false,
		isFinish: true,
	},
	{
		id: 3,
		title: "Tryout UTBK TPS #2",
		enrollTotal: 1000,
		exampTotal: 50,
		isFree: true,
		isFinish: false,
	},
	{
		id: 4,
		title: "Tryout UTBK Soshum #1",
		enrollTotal: 1000,
		exampTotal: 50,
		coinTotal: 300,
		isFree: false,
		isFinish: true,
	},
	{
		id: 5,
		title: "Tryout UTBK TPS #2",
		enrollTotal: 1000,
		exampTotal: 50,
		isFree: true,
		isFinish: false,
	},
	{
		id: 6,
		title: "Tryout UTBK Soshum #1",
		enrollTotal: 1000,
		exampTotal: 50,
		coinTotal: 300,
		isFree: false,
		isFinish: false,
	},
];
