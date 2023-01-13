import { collection, doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "../configs/firebase";
import { TryOutDataTypes } from "../screens/Stack/TryOut/fakeData";
import { UserInfoTypes } from "../types/userInfoTypes";

export class FireStoreTryOutDB {
	private collectionPath = doc(collection(firestoreDB, "TryOut"));

	public constructor(path: any) {}

	public async setData(data: TryOutDataTypes) {
		try {
			await setDoc(this.collectionPath, data);
		} catch (error: any) {
			console.log(error);
			return error;
		}
	}
}

export class FireStoreUserDB {
	private collectionPath = doc(collection(firestoreDB, "User"));
	private documentPath = (documentId: string) => doc(firestoreDB, documentId, "User");

	public async setUser({ documentId, data }: { documentId: string; data: UserInfoTypes }) {
		try {
			await setDoc(doc(firestoreDB, documentId, "User"), data);
		} catch (error: any) {
			console.log(error);
			return error;
		}
	}
}
