import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, HStack, Image, Text, Pressable, VStack, FlatList, Heading, ScrollView } from "native-base";
import { Card } from "../../components/Card";
import Layout from "../../components/Layout";
import { FontAwesome5, MaterialIcons, Ionicons, Fontisto, MaterialCommunityIcons } from "@expo/vector-icons";
import { RootParamList } from "../../navigations";
import { TouchableOpacity } from "react-native";

type HomeScreenPropsTypes = NativeStackScreenProps<RootParamList, "Home">;

export default function HomeScreen({ navigation }: HomeScreenPropsTypes) {
	const defaultImage = "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg";
	const cardData = [
		{
			id: 1,
			title: "hello world",
			description:
				"You can change the theme prop dynamically and all the components will automatically update to reflect the new theme",
			image: defaultImage,
		},
		{
			id: 2,
			title: "hello world",
			description:
				"You can change the theme prop dynamically and all the components will automatically update to reflect the new theme",
			image: defaultImage,
		},
		{
			id: 3,
			title: "hello world",
			description:
				"You can change the theme prop dynamically and all the components will automatically update to reflect the new theme",
			image: defaultImage,
		},
		{
			id: 4,
			title: "hello world",
			description:
				"You can change the theme prop dynamically and all the components will automatically update to reflect the new theme",
			image: defaultImage,
		},
	];
	return (
		<Layout>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Banner />
				<HStack my="5" px="2" flexWrap="wrap" justifyContent="space-between">
					<FontAwesome5 name="brain" size={50} />
					<FontAwesome5 name="square-root-alt" size={50} />
					<FontAwesome5 name="book" size={50} />
					<Fontisto name="atom" size={50} />
				</HStack>
				<HStack my="5" px="2" flexWrap="wrap" justifyContent="space-between">
					<FontAwesome5 name="calculator" size={50} />
					<FontAwesome5 name="book" size={50} />
					<Fontisto name="atom" size={50} />
					<MaterialCommunityIcons name="virus" size={50} />
				</HStack>
				<Heading mt="5" fontWeight="extraBlack" fontStyle="italic">
					Recomend
				</Heading>

				{cardData.map((item) => (
					<Card key={item.id} title={item.title} description={item.description} image={item.image} />
				))}
			</ScrollView>
		</Layout>
	);
}

const Banner = () => {
	return (
		<Box bg="primary.600" py="4" px="3" borderRadius="5" rounded="md">
			<HStack justifyContent="space-between">
				<Box justifyContent="space-between">
					<VStack space="2">
						<Text fontSize="sm" color="white">
							30 day, 12 hour menuju utbk
						</Text>
						<Text color="white" fontSize="xl">
							Hello, Jack
						</Text>
					</VStack>
					<HStack space={2}>
						<HStack space={1}>
							<FontAwesome5 name="bitcoin" size={24} color="#FFD700" />
							<Text fontSize="sm" fontWeight="bold" color="white">
								100
							</Text>
						</HStack>
						<TouchableOpacity>
							<HStack space={1}>
								<MaterialIcons name="add-box" size={24} color="#fff" />
								<Text fontSize="sm" fontWeight="bold" color="white">
									Top Up
								</Text>
							</HStack>
						</TouchableOpacity>
					</HStack>
				</Box>
				<Image
					source={{
						uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
					}}
					alt="Aang flying and surrounded by clouds"
					height="100"
					rounded="full"
					width="100"
				/>
			</HStack>
		</Box>
	);
};
