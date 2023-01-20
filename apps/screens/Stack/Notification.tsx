import { Button, FlatList, HStack, Input, Stack, Text, VStack } from "native-base";
import Layout from "../../components/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations";
import { LocalStorage } from "../../localStorage";
import { useContext, useEffect, useRef, useState } from "react";
import { BASE_COLOR } from "../../utilities/baseColor";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes, NotificationsTypes } from "../../types";
import { FirestoreDB } from "../../firebase/firebaseDB";

type NotificationScreenPropsTypes = NativeStackScreenProps<RootParamList, "Notification">;

const NotificationScreen = ({ navigation }: NotificationScreenPropsTypes) => {
	const { userInfo } = useContext<ContextApiTypes>(RootContext);
	const [listPerson, setListPerson] = useState<any[]>([]);
	const [name, setName] = useState("");
	const [notificationList, setNotificationList] = useState<NotificationsTypes[]>([]);

	const storage = new LocalStorage("notification");

	const remoreNotificationFromFirestore = async () => {
		const updateCoin = new FirestoreDB("User");
		await updateCoin.update({ documentId: userInfo.email, newData: { notifications: [] } });
		userInfo.notifications = [];
	};

	useEffect(() => {
		(async () => {
			const localNotification = (await storage.get()) || [];
			console.log(localNotification);

			if (userInfo.notifications.length === 0) {
				setNotificationList(localNotification);
				return;
			}

			if (userInfo.notifications.length !== 0) {
				const notificationUpdated = [...localNotification, ...userInfo.notifications];
				setNotificationList(notificationUpdated);
				await storage.store(notificationUpdated);
				await remoreNotificationFromFirestore();
				return;
			}
		})();
	}, []);

	const handleSaveData = async () => {
		const store = await storage.store([{ name: name }]);
	};

	const handleGetData = async () => {
		const store = await storage.get();
		console.log(store);
		setListPerson(store);
	};

	const handleRemove = async () => {
		storage.remove();
	};

	const handleUpdate = async () => {
		storage.update(1673238792912, {
			id: 1673238792912,
			name: "Hello world",
		});
	};

	return (
		<Layout>
			<FlatList
				data={notificationList}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<VStack
						backgroundColor={"#FFF"}
						my="1"
						minH="20"
						borderWidth="1"
						borderColor="gray.200"
						p="2"
						justifyContent="space-between"
					>
						<HStack>
							<Text fontSize="16" color={BASE_COLOR.text.primary}>
								{item.message}
							</Text>
						</HStack>
						<HStack justifyContent="flex-end">
							<Text fontSize="11" color={BASE_COLOR.text.primary}>
								{item.createdAt}
							</Text>
						</HStack>
					</VStack>
				)}
			/>
			{/* <Button onPress={handleRemove}>Remove</Button> */}
		</Layout>
	);
};

export default NotificationScreen;
