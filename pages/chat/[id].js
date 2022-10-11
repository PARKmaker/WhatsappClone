import styled from "styled-components";
import Head from "next/head";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, usersChatsCollectionRef } from "../../firebase";
import {
	collection,
	orderBy,
	query,
	getDoc,
	doc,
	getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";

function Chat({ chat, messages }) {
	const [user] = useAuthState(auth);

	return (
		<Container>
			<Head>
				<title>Chat with {getRecipientEmail(chat.users, user)}</title>
			</Head>
			<Sidebar>This is a chat</Sidebar>
			<ChatContainer>
				<ChatScreen chat={chat} messages={messages}></ChatScreen>
			</ChatContainer>
		</Container>
	);
}

export default Chat;

export async function getServerSideProps(context) {
	const ref = doc(usersChatsCollectionRef, context.query.id);

	//PREP the messages in the server
	const messagesRes = await getDocs(
		query(collection(ref, "messages"), orderBy("timestamp", "asc"))
	);

	const messages = messagesRes.docs
		.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		.map((messages) => ({
			...messages,
			timestamp: messages.timestamp.toDate().getTime(),
		}));
	// PREP the Chats
	const chatRes = await getDoc(ref);
	const chat = {
		id: chatRes.id,
		...chatRes.data(),
	};

	return {
		props: {
			messages: JSON.stringify(messages),
			chat: chat,
		},
	};
}

const Container = styled.div`
	display: flex;
`;
const ChatContainer = styled.div`
	flex: 1;
	overflow: scroll;
	height: 100vh;

	::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none; // IE and Edge
	scrollbar-width: none; // Firefox
`;