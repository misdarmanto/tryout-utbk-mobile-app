import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDmWA8TXe-eAiGBDCwNabwTMv0Q7xebByg",
	authDomain: "tryout-utbk-app.firebaseapp.com",
	projectId: "tryout-utbk-app",
	storageBucket: "tryout-utbk-app.appspot.com",
	messagingSenderId: "1087914376003",
	appId: "1:1087914376003:web:fb306e45dfe8933e5f8df6",
};

const app = initializeApp(firebaseConfig);

export const DB = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
