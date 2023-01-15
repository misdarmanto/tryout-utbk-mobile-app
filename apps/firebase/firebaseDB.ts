import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { DB } from "../configs/firebase";
import { TryOutDataTypes } from "../screens/Stack/TryOut/fakeData";

export class FirestoreDB {
	private collectionName: string;

	constructor(collectionName: string) {
		this.collectionName = collectionName;
	}

	private getDocumentPath(documentId: string) {
		return doc(DB, this.collectionName, documentId);
	}

	private getCollectionPath() {
		return collection(DB, this.collectionName);
	}

	public async set({ documentId, data }: { documentId: string; data: any }) {
		try {
			await setDoc(this.getDocumentPath(documentId), data);
			return this;
		} catch (error: any) {
			console.log(error);
			return error;
		}
	}

	public async get({ documentId }: { documentId: string }) {
		try {
			const docSnap = await getDoc(this.getDocumentPath(documentId));
			if (!docSnap.exists()) throw Error("No such document!");
			return docSnap.data();
		} catch (error: any) {
			console.log(error);
			return error;
		}
	}

	public async getCollection() {
		try {
			const extractData = (snapshoot: any) => {
				const data: TryOutDataTypes[] = [];
				snapshoot.forEach((doc: any) => {
					data.push({ ...doc.data(), id: doc.id });
				});
				return data;
			};

			const collectionPath = this.getCollectionPath();
			const querySnapshot = await getDocs(collectionPath);
			const result = extractData(querySnapshot);
			return result;
		} catch (error: any) {
			console.log(error);
			return error;
		}
	}

	public async update({ documentId, newData }: { documentId: string; newData: any }) {
		try {
			await updateDoc(this.getDocumentPath(documentId), newData);
			return this;
		} catch (error: any) {
			console.log(error);
			return error;
		}
	}
}
