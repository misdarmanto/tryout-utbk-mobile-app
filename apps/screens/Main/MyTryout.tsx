import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, FlatList, Heading, HStack } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { CardTryOut, CardTryOutTypes } from "../../components/card/CardTryOut";
import Layout from "../../components/Layout";
import TryOutScreenSkeleton from "../../components/skeleton/TryOutScreenSkeleton";
import { RootParamList } from "../../navigations";
import { BASE_COLOR } from "../../utilities/baseColor";

type MyTryOutPropsTypes = NativeStackScreenProps<RootParamList, "MyTryOut">;

export default function MyTryOutScreen({ navigation }: MyTryOutPropsTypes) {
	const [tryoutData, setTryoutData] = useState<CardTryOutTypes[]>(cardData);
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("All");

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	const onRefresh = useCallback(() => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
		}, 2000);
	}, []);

	const handleSelectTab = (category: string) => {
		setActiveTab(category);
		if (category === "All") {
			setTryoutData(cardData);
			return;
		}
		const newTab = cardData.filter((item: CardTryOutTypes) => item.category === category);
		setTryoutData(newTab);
	};

	const Tab = () => {
		const TAB_HEADER_NAMES = ["All", "TPS", "Saintek", "Soshum"];
		return (
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
					renderItem={({ item }) => (
						<CardTryOut onPress={() => navigation.navigate("DetailTryOut")} {...item} />
					)}
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

const cardData: CardTryOutTypes[] = [
	{
		id: 1,
		title: "Tryout UTBK Saintek #1",
		enrollTotal: 1000,
		exampTotal: 50,
		isFree: true,
		category: "Soshum",
	},
	{
		id: 2,
		title: "Tryout UTBK Saintek #2",
		enrollTotal: 1000,
		exampTotal: 50,
		coinTotal: 300,
		isFree: false,
		category: "Saintek",
	},
	{
		id: 3,
		title: "Tryout UTBK TPS #2",
		enrollTotal: 1000,
		exampTotal: 50,
		isFree: true,
		category: "Soshum",
	},
	{
		id: 4,
		title: "Tryout UTBK Soshum #1",
		enrollTotal: 1000,
		exampTotal: 50,
		coinTotal: 300,
		isFree: false,
		category: "Saintek",
	},
	{
		id: 5,
		title: "Tryout UTBK TPS #2",
		enrollTotal: 1000,
		exampTotal: 50,
		isFree: true,
		category: "TPS",
	},
	{
		id: 6,
		title: "Tryout UTBK Soshum #1",
		enrollTotal: 1000,
		exampTotal: 50,
		coinTotal: 300,
		isFree: false,
		category: "TPS",
	},
	{
		id: 7,
		title: "Tryout UTBK TPS #2",
		enrollTotal: 1000,
		exampTotal: 50,
		isFree: true,
		category: "Saintek",
	},
	{
		id: 8,
		title: "Tryout UTBK Soshum #1",
		enrollTotal: 1000,
		exampTotal: 50,
		coinTotal: 300,
		isFree: false,
		category: "Saintek",
	},
];
