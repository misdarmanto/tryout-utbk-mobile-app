import { Button, Input, Stack, Text, VStack } from "native-base";
import Layout from "../../components/Layout";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootParamList } from "../../navigations";
import { LocalStorage } from "../../utilities/localStorage";
import { useRef, useState } from "react";

type NotificationScreenPropsTypes = NativeStackScreenProps<RootParamList, "Notification">;

const NotificationScreen = ({ navigation }: NotificationScreenPropsTypes) => {
	const [listPerson, setListPerson] = useState<any[]>([]);
	const [name, setName] = useState("");

	const storage = new LocalStorage("test");

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
			<Text>Notification</Text>

			<VStack space={5}>
				<Input
					size="xs"
					placeholder="name"
					onChangeText={(text) => setName(text)}
					value={name}
				/>

				<Button onPress={handleSaveData}>save</Button>
				<Button onPress={handleGetData}>get</Button>
				<Button onPress={handleRemove}>remove</Button>
				<Button onPress={handleUpdate}>update</Button>

				{listPerson.map((person, index) => (
					<Text key={index}>name: {person.name}</Text>
				))}
			</VStack>
		</Layout>
	);
};

export default NotificationScreen;
