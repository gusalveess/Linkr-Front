import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { AiOutlineSearch, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useMessage } from "../../Contexts/messageContext";
import * as service from "../../Services/linkr";

export default function Header() {
	const [search, setSearch] = useState("");
	const [click, setClick] = useState(false);

	const { setMessage } = useMessage();
	const navigate = useNavigate();

	let user = JSON.parse(localStorage.getItem("linkr"));

	const arrowStyle = { color: "white", fontSize: "1.5em" };

	function logoutFunction() {
		const promise = service.logout();

		promise.catch(() => {
			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: "Não foi possível fazer logout.",
				},
			});
		});

		promise.then(() => {
			localStorage.removeItem("linkr");
			navigate("/");
		});
	}

	return (
		<>
			<Top>
				<h1>Linkr</h1>

				<SearchBar>
					<input
						type="text"
						placeholder="Search for people"
						defaultValue={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					<AiOutlineSearch />
				</SearchBar>

				<Container>
					<ScreenUser>
						{click ? (
							<AiOutlineDown
								onClick={() => setClick(!click)}
								style={arrowStyle}
							/>
						) : (
							<AiOutlineUp
								style={arrowStyle}
								onClick={() => setClick(!click)}
							/>
						)}

						<img
							src={user?.userImage}
							alt="user"
							onClick={() => setClick(!click)}
						/>
					</ScreenUser>

					{click ? (
						<>
							<CloseLogout onClick={() => setClick(!click)}></CloseLogout>

							<Logout onClick={logoutFunction}>
								<h1>Logout</h1>
							</Logout>
						</>
					) : (
						<></>
					)}
				</Container>
			</Top>
		</>
	);
}

const Top = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 20px;

	width: 100%;
	height: 72px;
	background-color: #151515;

	h1 {
		font-family: "Passion One", cursive;
		font-weight: 700;
		color: #fff;
		font-size: 49px;
	}
`;

const SearchBar = styled.div`
	width: 35%;
	height: 60%;
	background-color: #ffffff;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 10px;
	padding-right: 10px;

	input {
		border: none;
		font-family: "Lato";
		font-size: 19px;
	}

	textarea:focus,
	input:focus {
		box-shadow: 0 0 0 0;
		outline: 0;
	}
`;
const ScreenUser = styled.div`
	display: flex;
	height: 50px;
	right: 20px;
	bottom: 20px;
	position: relative;

	align-items: center;

	img {
		margin-left: 10px;
		width: 50px;
		height: 50px;
		object-fit: cover;
		border-radius: 40px;
		cursor: pointer;
	}

	svg {
		cursor: pointer;
	}
`;

const Container = styled.div`
	display: inline;
	margin-top: 50px;
	position: relative;

	h1 {
		display: flex;
		justify-content: center;

		align-items: center;
		font-weight: 400;

		font-size: 17px;
	}
`;

const CloseLogout = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	right: 0;
	z-index: 2;
`;

const Logout = styled.div`
	display: flex;
	justify-content: center;
	position: absolute;
	top: 36px;
	z-index: 3;

	width: 100%;
	height: 47px;

	background-color: #151515;
	border-bottom-left-radius: 15px;
	cursor: pointer;
`;
