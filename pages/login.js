import styled from "styled-components";
import Head from "next/head";
import { Button } from "@material-ui/core";
import { signInWithAlert } from "../firebase";

function Login() {
	return (
		<Container>
			<Head>
				<title>Login</title>
			</Head>

			<LoginContainer>
				<Logo src="https://media.istockphoto.com/vectors/-vector-id1010001882?k=20&m=1010001882&s=612x612&w=0&h=6ZqzWlYBD3bT2EqJolzC3xbIKVVy350qMQmmS6B-Wd4=" />
				<Button onClick={signInWithAlert} variant="outlined">
					Sign in with Google
				</Button>
			</LoginContainer>
		</Container>
	);
}

export default Login;

const Container = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
	background-color: whitesmoke;
`;

const LoginContainer = styled.div`
	padding: 100px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: white;
	border-radius: 5px;
	box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
	height: 200px;
	width: 200px;
	margin-bottom: 50px;
`;
