import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { AiOutlineSearch, AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useMessage } from "../../Contexts/messageContext";
import * as service from "../../Services/linkr";
import LoadingSpinner from "../Common/LoadingSpinner";

export default function Header() {
	const [users, setUsers] = useState([]);
	const [search, setSearch] = useState("");
	const [click, setClick] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { setMessage } = useMessage();
	const navigate = useNavigate();

	let user = JSON.parse(localStorage.getItem("linkr"));

	const arrowStyle = { color: "white", fontSize: "1.5em" };

	function searchUser(search) {
		setIsLoading(true);
		setSearch(search);

		if (search.length >= 3) {	

			const promise = service.listUsers(search);

			promise.catch(() => {
				setIsLoading(false);

				setMessage({
					type: "alert",
					message: {
						type: "error",
						text: "Não foi possível buscar usuários da platarfoma.",
					},
				});
			});

			promise.then(({ data }) => {
				setIsLoading(false);
				setUsers(data);
			});
		}
	}

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

	function seeUser(id) {
		setSearch("");
		navigate(`/user/${id}`);
	}

	return (
		<>
			<Top>
				<h1>linkr</h1>

				<Search>
					<SearchBar>
						<DebounceInput
							minLength={3}
							debounceTimeout={300}
							onChange={(e) => searchUser(e.target.value)}
							type="text"
							placeholder="Search for people"
						/>

						<AiOutlineSearch size={24} color="#C6C6C6" />
					</SearchBar>

					<Users search={!!search}>
						{isLoading ? (
							<LoadingSpinner />
						) : users.length === 0 ? (
							<span>Nenhum usuário encontrado</span>
						) : (
							users.map(({ username, picture, userId, followedByUser }, index) => (
								<User key={index} onClick={() => seeUser(userId)}>
									<img src={picture} alt="user" />

									<span>
										{username}
										<em>{followedByUser ? " • following" : ""}</em>
									</span>
								</User>
							))
						)}
					</Users>
				</Search>

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
	padding: 0 0 0 20px;

	width: 100%;
	height: 72px;
	background-color: #151515;

	h1 {
		font-family: "Passion One", cursive;
		font-weight: 700;
		color: #fff;
		font-size: 49px;
	}

	@media(max-width: 611px) {
		h1 {
			font-size: 45px;
		}
	}
`;

const ScreenUser = styled.div`
	display: flex;
	height: 50px;
	align-items: center;
	margin: 0 20px 0 0;

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

	@media(max-width: 611px) {
		img {
			width: 40px;
			height: 40px;
		}

		svg {
			width: 20px;
			height: 20px;
			cursor: pointer;
		}
	}
`;

const Container = styled.div`
	display: inline;
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
	top: 50px;
	z-index: 6;

	width: 100%;
	height: 47px;

	background-color: #151515;
	border-bottom-left-radius: 15px;
	cursor: pointer;
`;

const Search = styled.div`
	width: 50%;
	max-width: 563px;
	height: 45px;

	@media(max-width: 611px) {
		margin: 140px auto 0;
		width: 90%;
		position: absolute;
	}
`;

const SearchBar = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 4;

	input {
		width: 100%;
		height: 100%;
		background-color: #ffffff;
		border-radius: 8px;
		border: none;
		padding: 0 30px 0 14px;
		font-family: "Lato";
		font-size: 19px;
		color: #707070;
	}

	input::placeholder {
		font-family: "Lato";
		font-size: 19px;
		color: #c6c6c6;
	}

	input:focus {
		box-shadow: 0 0 0 0;
		outline: 0;
	}

	svg {
		position: absolute;
		right: 10px;
		top: 10px;
	}
`;

const Users = styled.div`
	width: 100%;
	height: auto;
	max-height: 300px;
	padding: 20px 0;
	margin: 0;
	display: ${(props) => (props.search ? "inherit" : "none")};
	border-radius: 0 0 8px 8px;
	background-color: #e7e7e7;
	transform: translateY(-10px);
	position: relative;
	z-index: 3;
	text-align: center;
    overflow-y: scroll;
    overflow-x: hidden;

	& > span {
		font-family: "Lato";
		font-size: 16px;
		color: #515151;
	}

	&::-webkit-scrollbar {
		width: 5px;
	}

	&::-webkit-scrollbar-track {
		width: 5px;
		border-radius: 3px;
		background-color: transparent;=
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 3px;
		background-color: #acacac;
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: #acacac;
		filter: brightness(1.5);
	}
`;

const User = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	padding: 0 20px;
	align-items: center;
	background-color: #e7e7e7;
	font-family: "Lato";
	font-size: 19px;
	color: #515151;
	cursor: default;

	img {
		width: 39px;
		height: 39px;
		object-fit: cover;
		border-radius: 50%;
	}

	span {
		margin: 0 0 0 12px;

		em {
			font-size: 14px;
			color: #acacac;
		}
	}

	&:hover {
		filter: brightness(0.9);
	}
`;
