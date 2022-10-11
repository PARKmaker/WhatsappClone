import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth"; //yarn add react-firebase-hooks
import { auth, usersUsersCollectionRef } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import Login from "./login";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }) {
	const [user, loading] = useAuthState(auth);

	useEffect(() => {
		if (user) {
			const userDocRef = doc(usersUsersCollectionRef, user.uid);

			setDoc(
				userDocRef,
				{
					email: user.email,
					lastSeen: serverTimestamp(),
					photoURL: user.photoURL,
				},
				{ merge: true }
			);
		}
	}, [user]);

	if (loading) return <Loading />;
	if (!user) return <Login />;

	return <Component {...pageProps} />;
}

export default MyApp;
