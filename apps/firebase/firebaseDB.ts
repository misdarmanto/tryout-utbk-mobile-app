import { collection, doc, getDoc, setDoc } from "firebase/firestore";
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
	private collectionName = "User";
	private collectionPath = doc(collection(firestoreDB, this.collectionName));
	private documentPath = (documentId: string) => doc(firestoreDB, this.collectionName, documentId);

	public async setUser({ documentId, data }: { documentId: string; data: UserInfoTypes }) {
		try {
			await setDoc(this.documentPath(documentId.toLowerCase()), data);
			return this;
		} catch (error: any) {
			console.log(error);
			return error;
		}
	}

	public async getUser({ documentId }: { documentId: string }) {
		try {
			const docSnap = await getDoc(this.documentPath(documentId));
			if (!docSnap.exists()) throw Error("No such document!");
			return docSnap.data();
		} catch (error: any) {
			console.log(error);
			return error;
		}
	}
}
