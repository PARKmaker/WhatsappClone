import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyD69M05RX_66j0NVmmX-x9oUSSDJ_jutOg",
	authDomain: "chatbot-2f142.firebaseapp.com",
	projectId: "chatbot-2f142",
	storageBucket: "chatbot-2f142.appspot.com",
	messagingSenderId: "70531121599",
	appId: "1:70531121599:web:bb16343916f4cb37f1a10a",
	measurementId: "G-NFN4FFCJ6J",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();

const usersChatsCollectionRef = collection(db, "chats");
const usersUsersCollectionRef = collection(db, "users");

const signInWithAlert = () => {
	signInWithPopup(auth, googleProvider).catch(alert);
};

const signOutWithAlert = () => {
	signOut(auth)
		.then(() => {
			alert("Sign-out successful");
		})
		.catch((error) => {
			alert(error);
		});
};

const googleProvider = new GoogleAuthProvider();

export {
	db,
	auth,
	googleProvider,
	signInWithAlert,
	signOutWithAlert,
	usersChatsCollectionRef,
	usersUsersCollectionRef,
};
