import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, FlatList, HStack, Progress, Text, VStack } from "native-base";
import Layout from "../../../components/Layout";
import { RootParamList } from "../../../navigations";
import { FontAwesome5, MaterialIcons, Entypo, FontAwesome } from "@expo/vector-icons";
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
import { LearningModuleTypes } from "../../../types/learningModuleTypes";
import { TouchableOpacity } from "react-native";
import { widthPercentage } from "../../../utilities/dimension";

type ListLearningModuleScreenPropsTypes = NativeStackScreenProps<RootParamList, "ListLearningModule">;

export default function ListLearningModuleScreen({ route, navigation }: ListLearningModuleScreenPropsTypes) {
	const { userInfo, appInfo } = useContext<ContextApiTypes>(RootContext);
	const { category } = route.params;

	const [ListLearningModule, setListLearningModule] = useState<LearningModuleTypes[]>([]);

	const getListLearningModule = async () => {
		const LEARNING_MODULE_KEY = `learning_module_key_${category}`;
		const EXPIRE_KEY = `learning_module_expire_time_key_${category}`;

		const learningModluleFromLocalStorage = await getDataFromLocalStorage({ key: LEARNING_MODULE_KEY });
		const expireTime = await getExpireTimeFromLocalStorage({ key: EXPIRE_KEY });

		const currentDateTime = Date.now();
		const hasExpired = expireTime >= currentDateTime;

		if (learningModluleFromLocalStorage && hasExpired) {
			return learningModluleFromLocalStorage;
		}

		const LearningModuleDB = new FirestoreDB("Article");
		const learningModuleFromDB = await LearningModuleDB.queryCollection({
			params_1: "category",
			params_2: category,
		});

		await saveDataToLocalStorage({ key: LEARNING_MODULE_KEY, item: learningModuleFromDB });
		await setExpireTimeToLocalStorage({
			key: EXPIRE_KEY,
			time: appInfo.tryOutSettings.cacheExpireTimeInMinute || 5,
		});
		return learningModuleFromDB;
	};

	useEffect(() => {
		(async () => {
			const result = await getListLearningModule();
			setListLearningModule(result);
		})();
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: category,
		});
	}, []);

	const handleNavigateToDetailScreen = (item: any) => {
		navigation.navigate("DetailLearningModule", { moduleItem: item });
	};

	return (
		<Layout>
			<FlatList
				ListHeaderComponent={
					<ListHeaderComponent totalModule={ListLearningModule.length} category={category + ""} />
				}
				data={ListLearningModule}
				keyExtractor={(item) => item.id + ""}
				renderItem={({ item }) => (
					<ListLearningModuleItem
						title={item.title}
						onPress={() => handleNavigateToDetailScreen(item)}
					/>
				)}
			/>
		</Layout>
	);
}

const ListHeaderComponent = ({ totalModule, category }: { totalModule: number; category: string }) => {
	return (
		<VStack
			backgroundColor="#FFF"
			minH="24"
			mt="3"
			mb="5"
			px="5"
			rounded="md"
			space={2}
			justifyContent="center"
			borderWidth={1}
			borderColor="gray.200"
		>
			<HStack justifyContent="space-between" alignItems="center">
				<Progress
					size="md"
					value={45}
					width={widthPercentage(75)}
					bg="coolGray.100"
					_filledTrack={{
						bg: BASE_COLOR.primary,
					}}
				/>
				<Text color={BASE_COLOR.text.primary} fontFamily="lato">
					50%
				</Text>
			</HStack>
			<HStack space={5}>
				<HStack space={1} alignItems="center">
					<FontAwesome name="list-alt" size={20} color={BASE_COLOR.text.secondary} />
					<Text fontFamily="lato" fontSize="sm" color={BASE_COLOR.text.secondary}>
						{category}
					</Text>
				</HStack>

				<HStack space={1} alignItems="center">
					<Entypo name="folder" size={20} color={BASE_COLOR.text.secondary} />
					<Text fontFamily="lato" fontSize="sm" color={BASE_COLOR.text.secondary}>
						{totalModule} module
					</Text>
				</HStack>
			</HStack>
		</VStack>
	);
};
const ListLearningModuleItem = ({ title, onPress }: { title: string; onPress: any }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<HStack
				backgroundColor="#FFF"
				p={3}
				alignItems="center"
				justifyContent="space-between"
				borderWidth={1}
				borderColor="gray.200"
				my={1}
				borderRadius="5"
				rounded="md"
			>
				<HStack space={3} alignItems="center">
					<Box backgroundColor={BASE_COLOR.blue[100]} rounded="full" p={5}>
						<FontAwesome5 name="book" size={24} color={BASE_COLOR.text.secondary} />
					</Box>
					<Text fontFamily="lato" fontSize="md" color={BASE_COLOR.text.secondary}>
						{title}
					</Text>
				</HStack>
				<MaterialIcons name="keyboard-arrow-right" size={30} color={BASE_COLOR.text.primary} />
			</HStack>
		</TouchableOpacity>
	);
};
