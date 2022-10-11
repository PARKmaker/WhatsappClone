import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
	serverTimestamp,
	setDoc,
	collection,
	doc,
	orderBy,
	query,
	addDoc,
	where,
} from "firebase/firestore";
import {
	auth,
	usersChatsCollectionRef,
	usersUsersCollectionRef,
} from "../firebase";
import styled from "styled-components";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmotioconIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { Avatar, IconButton } from "@material-ui/core";
import Message from "./Message";
import { useState } from "react";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import { useRef } from "react";

function ChatScreen({ chat, messages }) {
	const [user] = useAuthState(auth);
	const [input, setInput] = useState("");
	const router = useRouter();
	const endOfMessagesRef = useRef(null);
	const messagesCollectionRef = collection(
		doc(usersChatsCollectionRef, router.query.id),
		"messages"
	);

	const [messagesSnapshot] = useCollection(
		query(messagesCollectionRef, orderBy("timestamp", "asc"))
	);

	const [recipientSnapshot] = useCollection(
		query(
			usersUsersCollectionRef,
			where("email", "==", getRecipientEmail(chat.users, user))
		)
	);

	const showMessages = () => {
		if (messagesSnapshot) {
			return messagesSnapshot.docs.map((message) => (
				<Message
					key={message.id}
					user={message.data().user}
					message={{
						...message.data(),
						timestamp: message.data().timestamp?.toDate().getTime(),
					}}
				/>
			));
		} else {
			return JSON.parse(messages).map((message) => (
				<Message key={message.id} user={message.user} message={message} />
			));
		}
	};

	const scrollToBottom = () => {
		endOfMessagesRef.current.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	const sendMessage = (e) => {
		e.preventDefault();

		// Update the lass seen
		setDoc(
			doc(usersChatsCollectionRef, user.uid),
			{
				lastSeen: serverTimestamp(),
			},
			{ merge: true }
		);

		addDoc(messagesCollectionRef, {
			timestamp: serverTimestamp(),
			message: input,
			user: user.email,
			photoURL: user.photoURL,
		});

		setInput("");
		scrollToBottom();
	};

	const recipient = recipientSnapshot?.docs?.[0]?.data();
	console.log(recipientSnapshot?.docs);
	const recipientEmail = getRecipientEmail(chat.users, user);

	return (
		<Container>
			<Header>
				{recipient ? (
					<Avatar src={recipient?.photoURL} />
				) : (
					<Avatar>{recipientEmail[0]}</Avatar>
				)}
				<HeaderInformation>
					<h3>{recipientEmail}</h3>
					{recipientSnapshot ? (
						<p>
							Last active:{" "}
							{recipient?.lastSeen?.toDate() ? (
								<TimeAgo datetime={recipient?.lastSeen?.toDate()} />
							) : (
								"Unavailable"
							)}
						</p>
					) : (
						<p>Loading last Active</p>
					)}
				</HeaderInformation>
				<HeaderIcon>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</HeaderIcon>
			</Header>

			<MessageContainer>
				{showMessages()}
				<EndOfMessage ref={endOfMessagesRef} />
			</MessageContainer>

			<InputContainer>
				<InsertEmotioconIcon />
				<Input value={input} onChange={(e) => setInput(e.target.value)} />
				<button hidden disabled={!input} type="submit" onClick={sendMessage}>
					Send Message
				</button>
				<MicIcon />
			</InputContainer>
		</Container>
	);
}

export default ChatScreen;

const Container = styled.div``;

const InputContainer = styled.form`
	display: flex;
	align-items: center;
	padding: 10px;
	position: sticky;
	bottom: 0;
	background-color: white;
	z-index: 100;
`;

const Input = styled.input`
	flex: 1;
	outline: 0px;
	border: none;
	border-radius: 10px;
	background-color: whitesmoke;
	padding: 20px;
	margin-left: 15px;
	margin-right: 15px;
`;

const Header = styled.div`
	position: sticky;
	background-color: white;
	z-index: 100;
	top: 0;
	display: flex;
	padding: 11px;
	height: 80px;
	align-items: center;
	border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
	margin-left: 15px;
	flex: 1;

	> h3 {
		margin-bottom: 3px;
	}

	> p {
		font-size: 14px;
		color: grey;
	}
`;

const EndOfMessage = styled.div`
	margin-bottom: 50px;
`;

const HeaderIcon = styled.div``;

const MessageContainer = styled.div`
	padding: 30px;
	background-color: #e5ded8;
	min-height: 90vh;
`;
