import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import { useMessage } from "../../Contexts/messageContext";
import * as service from "../../Services/linkr";

export default function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [disable, setDisable] = useState(false);

	const { setMessage } = useMessage();

	const Navigate = useNavigate();
	
	useEffect(() => {
	  	const isLogged = (JSON.parse(localStorage.getItem("linkr"))).token;
		
	 	if (isLogged) {
	  		Navigate("/timeline");
	  	};
	});

	function Post() {
		const body = {
			email: email,
			password: password,
		};

		setDisable(true);

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
		<Body>
			<MainOne>
				<div>
					<h1>linkr</h1>
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

					<button disabled={disable}>
						{disable ? (
							<ThreeDots color="#FFFFFF" height={13} width={51} />
						) : (
							"Log In"
						)}
					</button>
				</form>

				<p onClick={() => Navigate("/sign-up")}>
					First time? Create an account!
				</p>
			</MainTwo>
		</Body>
	);
}

const Body = styled.div`
	background-color: #fff;
	width: 100%;
	height: 100vh;
	display: flex;
	overflow-y: scroll;


	@media(max-width: 740px) {
		flex-direction: column;
	}
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

	@media(max-width: 740px) {
		width: 100%;
    	height: fit-content;
		text-align: center;

		div {
			margin: 30px auto;
    		width: 80%;
		}

		h1 {
			font-size: 76px;
		}

		h2 {
			font-size: 23px;
		}
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
		width: 90%;
		max-width: 429px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	input {
		width: 100%;
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
		width: 100%;
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

	button:hover {
		filter: brightness(0.8);
	}

	button:disabled {
		filter: brightness(0.7);
		cursor: initial;
	}

	p {
		font-family: "Lato", sans-serif;
		font-size: 20px;
		color: #fff;
		text-decoration: underline white;
		cursor: pointer;
	}

	@media(max-width: 740px) {
		width: 100%;
		height: auto;
		height: 100%;
		justify-content: flex-start;

		form {
			margin: 40px auto 0;
		}

		p {
			margin-bottom: 40px;
			font-size: 17px;
		}

		input {
			font-size: 22px;
		}

		input::placeholder {
			font-size: 22px;
		}

		button {
			font-size: 22px;
		}
	}
`;
