import { FlatList, HStack, Text, VStack } from "native-base";
import Layout from "../../components/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations";
import { LocalStorage } from "../../localStorage";
import { useContext, useEffect, useState } from "react";
import { BASE_COLOR } from "../../utilities/baseColor";
import { RootContext } from "../../utilities/rootContext";
import { ContextApiTypes, NotificationsTypes } from "../../types";
import { FirestoreDB } from "../../firebase/firebaseDB";
import EmptyAnimation from "../../components/animations/Empty";

type NotificationScreenPropsTypes = NativeStackScreenProps<RootParamList, "Notification">;

const NotificationScreen = ({ navigation }: NotificationScreenPropsTypes) => {
	const { userInfo } = useContext<ContextApiTypes>(RootContext);
	const { setUserInfo }: any = useContext(RootContext);
	const [notificationList, setNotificationList] = useState<NotificationsTypes[]>([]);

	const storage = new LocalStorage("notification");

	const remoreNotificationFromFirestore = async () => {
		const updateCoin = new FirestoreDB("User");
		await updateCoin.update({ documentId: userInfo.email, newData: { notifications: [] } });
	};

	const updateUserInfo = () => {
		setUserInfo({ ...userInfo, notifications: [] });
	};

	useEffect(() => {
		(async () => {
			const localNotification = (await storage.get()) || [];

			if (userInfo.notifications.length === 0) {
				localNotification.sort((a: any, b: any) => +b.id - +a.id);
				setNotificationList(localNotification);
				return;
			}

			if (userInfo.notifications.length !== 0) {
				const notificationUpdated = [...localNotification, ...userInfo.notifications];
				localNotification.sort((a: any, b: any) => +b.id - +a.id);
				setNotificationList(notificationUpdated);
				await storage.remove();
				await storage.store(notificationUpdated);
				await remoreNotificationFromFirestore();
				updateUserInfo();
				return;
			}
		})();
	}, []);

	const handleRemove = async () => {
		storage.remove();
	};

	return (
		<Layout>
			{notificationList.length === 0 && <EmptyAnimation title="Belum ada notifikasi" />}
			{notificationList.length !== 0 && (
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
			)}

			{/* <Button onPress={handleRemove}>Remove</Button> */}
		</Layout>
	);
};

export default NotificationScreen;
