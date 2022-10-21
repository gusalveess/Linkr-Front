import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useMessage } from "../../Contexts/messageContext";
import * as service from "../../Services/linkr";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [logIn, setLogIn] = useState("Log In");
	const [password, setPassword] = useState("");
	const [disable, setDisable] = useState(false);

	const { setMessage } = useMessage();

	const Navigate = useNavigate();

	function Post() {
		const body = {
			email: email,
			password: password,
		};

		setDisable(true);

		setLogIn(<ThreeDots color="#FFFFFF" height={13} width={51} />);

		const promise = service.signIn(body);

		promise.catch((error) => {
			if (error.response) {
				setMessage({
					type: "alert",
					message: {
						type: "error",
						text: error.response.data,
					},
				});
			}
			setDisable(false);
			setLogIn("Log In");
		});

		promise.then((res) => {
			localStorage.setItem(
				"linkr",
				JSON.stringify({ token: res.data.token, userImage: res.data.userImage })
			);

			Navigate("/timeline");
		});
	}

	function HandleForm(e) {
		e.preventDefault();
		Post();
	}

	return (
		<>
			<Body>
				<MainOne>
					<div>
						<h1>Linkr</h1>
						<h2>save, share and discover the best links on the web</h2>
					</div>
				</MainOne>

				<MainTwo>
					<form onSubmit={HandleForm}>
						<input
							type="email"
							placeholder="e-mail"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							disabled={disable}
							required
						/>
						<input
							type="password"
							placeholder="senha"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							disabled={disable}
							required
						/>

						<button>{logIn}</button>
					</form>

					<p onClick={() => Navigate("/sign-up")}>
						First time? Create an account!
					</p>
				</MainTwo>
			</Body>
		</>
	);
}

const Body = styled.div`
	background-color: #fff;
	width: 100%;
	height: 100vh;
	display: flex;
	overflow-y: scroll;
`;

const MainOne = styled.div`
	height: 100vh;
	width: 60%;
	background-color: #151515;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	div {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		width: 60%;
	}

	h1 {
		font-family: "Passion One", cursive;
		font-weight: 700;
		color: #fff;
		font-size: 106px;
	}

	h2 {
		font-family: "Passion One", cursive;
		font-weight: 700;
		color: #fff;
		font-size: 43px;
	}
`;

const MainTwo = styled.div`
	height: 100vh;
	width: 40%;
	background-color: #333333;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	form {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	input {
		width: 429px;
		height: 65px;
		margin-bottom: 13px;
		border: none;
		outline: none;
		border-radius: 6px;
		padding-left: 17px;
		font-size: 23px;
	}

	input::placeholder {
		font-family: "Oswald", sans-serif;
		font-weight: 700;
		font-size: 23px;
		color: #9f9f9f;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 442px;
		height: 65px;
		margin-bottom: 22px;
		border: none;
		background-color: #1877f2;
		border-radius: 6px;
		font-family: "Oswald", sans-serif;
		font-weight: 700;
		font-size: 23px;
		color: #fff;
		cursor: pointer;
	}

	p {
		font-family: "Lato", sans-serif;
		font-size: 20px;
		color: #fff;
		text-decoration: underline white;
		cursor: pointer;
	}
`;
