import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Box, HStack, Image, Text, Pressable, VStack, FlatList } from "native-base";
import { Card } from "../../components/Card";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";

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
	];
	return (
		<Layout>
			<Banner />
			<FlatList
				mt={2}
				data={cardData}
				keyExtractor={(item: any) => item.id}
				renderItem={({ item }) => <Card title={item.title} description={item.description} image={item.image} />}
			/>
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
							Today @ 9PM
						</Text>
						<Text color="white" fontSize="xl">
							Let's talk about avatar!
						</Text>
					</VStack>
					<Pressable rounded="xs" bg="primary.400" alignSelf="flex-start" py="1" px="3">
						<Text textTransform="uppercase" fontSize="sm" fontWeight="bold" color="white">
							Remind me
						</Text>
					</Pressable>
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
