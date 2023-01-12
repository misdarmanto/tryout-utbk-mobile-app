import React, { PropsWithChildren, useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Avatar, Heading, HStack, Text, VStack } from "native-base";
import Layout from "../../components/Layout";
import { RootParamList } from "../../navigations";
import { FontAwesome5, Ionicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { BASE_COLOR } from "../../utilities/baseColor";
import { TouchableOpacity } from "react-native";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes } from "../../types/contextApiTypes";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebase";
import ModalPrimary from "../../components/Modal/ModalPrimary";

type ProfilePropsTypes = NativeStackScreenProps<RootParamList, "Profile">;

export default function ProfileScreen({ navigation }: ProfilePropsTypes) {
	const { userInfo } = useContext<ContextApiTypes>(RootContext);
	const [openModal, setOpenModal] = useState(false);

	const handleLogOut = async () => {
		await signOut(auth);
	};

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
					<Avatar>{userInfo.name[0]}</Avatar>
					<VStack>
						<Heading color={BASE_COLOR.text.primary}>{userInfo.name}</Heading>
						<Text color={BASE_COLOR.text.primary}>{userInfo.email}</Text>
					</VStack>
				</HStack>
				<HStack space={1} alignItems="center">
					<FontAwesome5 name="bitcoin" size={32} color="#FFD700" />
					<Text fontSize="sm" fontWeight="bold" color={BASE_COLOR.text.primary}>
						{userInfo.coin}
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
					<MaterialCommunityIcons name="key-outline" size={30} color={BASE_COLOR.text.primary} />
					<Text fontSize="xl" fontWeight="bold" color={BASE_COLOR.text.primary}>
						Reset Password
					</Text>
				</CardProfileList>

				<TouchableOpacity activeOpacity={0.5} onPress={() => setOpenModal(true)}>
					<CardProfileList>
						<Ionicons name="exit-outline" size={30} color={BASE_COLOR.text.primary} />
						<Text fontSize="xl" fontWeight="bold" color={BASE_COLOR.text.primary}>
							Keluar
						</Text>
					</CardProfileList>
				</TouchableOpacity>
			</VStack>

			<ModalPrimary
				openModel={openModal}
				onCloseModal={setOpenModal}
				modalHeaderTitle="Keluar"
				modalText="Apakah anda yakin ingin keluar?"
				btnNoTitle="cancel"
				btnYesTitle="keluar"
				onBtnYesClick={handleLogOut}
			/>
		</Layout>
	);
}

const CardProfileList: React.FC<PropsWithChildren> = ({ children }) => {
	return (
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
	);
};
