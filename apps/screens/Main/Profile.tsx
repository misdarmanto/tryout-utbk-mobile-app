import React, { PropsWithChildren } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Heading, HStack, Text, VStack } from "native-base";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";
import { FontAwesome5, Ionicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { BASE_COLOR } from "../../utilities/baseColor";
import { TouchableOpacity } from "react-native";

type ProfilePropsTypes = NativeStackScreenProps<RootParamList, "Profile">;

export default function ProfileScreen({ navigation }: ProfilePropsTypes) {
	return (
		<Layout>
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
				<HStack alignItems="center" space={2}>
					<Avatar>M</Avatar>
					<VStack>
						<Heading color={BASE_COLOR.text.primary}>Misdar</Heading>
						<Text color={BASE_COLOR.text.primary}>misdar@mail.com</Text>
					</VStack>
				</HStack>
				<HStack space={1} alignItems="center">
					<FontAwesome5 name="bitcoin" size={32} color="#FFD700" />
					<Text fontSize="sm" fontWeight="bold" color={BASE_COLOR.text.primary}>
						100
					</Text>
				</HStack>
			</HStack>

			<VStack mt={10}>
				<CardProfileList>
					<AntDesign name="star" size={30} color={BASE_COLOR.text.primary} />
					<Text fontSize="xl" fontWeight="bold" color={BASE_COLOR.text.primary}>
						Beri Rating
					</Text>
				</CardProfileList>

				<CardProfileList>
					<MaterialCommunityIcons
						name="key-outline"
						size={30}
						color={BASE_COLOR.text.primary}
					/>
					<Text fontSize="xl" fontWeight="bold" color={BASE_COLOR.text.primary}>
						Reset Password
					</Text>
				</CardProfileList>

				<CardProfileList>
					<Ionicons name="exit-outline" size={30} color={BASE_COLOR.text.primary} />
					<Text fontSize="xl" fontWeight="bold" color={BASE_COLOR.text.primary}>
						Keluar
					</Text>
				</CardProfileList>
			</VStack>
		</Layout>
	);
}

const CardProfileList: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<TouchableOpacity activeOpacity={0.5}>
			<HStack
				backgroundColor="#FFF"
				p={5}
				space={5}
				alignItems="center"
				borderWidth={1}
				borderColor="gray.200"
				my={1}
				borderRadius="5"
				rounded="md"
			>
				{children}
			</HStack>
		</TouchableOpacity>
	);
};
