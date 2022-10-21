import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import { TiPencil as EditIcon } from "react-icons/ti";
import { FaTrash as TrashIcon } from "react-icons/fa";
import { ThreeDots as Loading } from "react-loader-spinner";

import { useMessage } from "../../Contexts/messageContext";
import * as service from "../../Services/linkr";

Modal.setAppElement(".root");

export default function Post({ post, update, setUpdate }) {
	const [linkData, setLinkData] = useState({});
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { setMessage } = useMessage();

	useEffect(() => {
		const promise = axios.get(`https://api.microlink.io/?url=${post.url}`);

		promise.then(({ data }) => setLinkData(data.data));
	}, [post.url]);

	function deletePostFunction() {
		setIsLoading(true);

		const promise = service.deletePost(post.id);

		promise.catch((error) => {
			setModalIsOpen(false);
			setIsLoading(false);
			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: "Não foi possível apagar o post.",
				},
			});
		});

		promise.then((res) => {
			setModalIsOpen(false);
			setIsLoading(false);
			setUpdate(!update);
		});
	}

	return (
		<>
			<DeleteModal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
			>
				{isLoading ? (
					<Loading color="#FFFFFF" height={13} width={51} />
				) : (
					<div>
						<div>
							<h1>Are you sure you want to delete this post?</h1>
						</div>

						<Buttons>
							<button onClick={() => setModalIsOpen(false)}>No, go back</button>

							<Confirm onClick={deletePostFunction}>Yes, delete it</Confirm>
						</Buttons>
					</div>
				)}
			</DeleteModal>

			<Wrapper>
				<div>
					<img src={post.userImage} alt="user" />
				</div>

				<PostData>
					<div>
						<h2>{post.from}</h2>
						<div>
							{post.owner ? (
								<>
									<EditIcon size="20px" />
									<TrashIcon size="15px" onClick={() => setModalIsOpen(true)} />
								</>
							) : (
								""
							)}
						</div>
					</div>

					<textarea defaultValue={post.description} />

					{linkData.title ? (
						<Snippet onClick={() => window.open(post.url)}>
							<div>
								<div>
									<h2>{linkData.title}</h2>
									<p>{linkData.description}</p>
								</div>

								<span>{linkData.url}</span>
							</div>

							<img src={linkData.image?.url} alt={linkData.title} />
						</Snippet>
					) : (
						""
					)}
				</PostData>
			</Wrapper>
		</>
	);
}

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	background-color: #171717;
	border-radius: 15px;
	padding: 18px;
	margin: 0 0 16px 0;
	color: #ffffff;
	font-weight: 400;
	font-size: 17px;
	overflow: hidden;

	h2 {
		height: 24px;
		font-size: 19px;
	}

	div {
		width: 68px;
		height: 100%;

		img {
			width: 50px;
			height: 50px;
			object-fit: cover;
			border-radius: 50%;
		}
	}

	@media (max-width: 611px) {
		border-radius: 0;
	}
`;

const PostData = styled.div`
	&& {
		width: 100%;
		height: auto;
		overflow: hidden;

		textarea {
			width: 100%;
			height: auto;
			border-radius: 6px;
			background-color: transparent;
			border: none;
			resize: none;
			font-size: 17px;
			color: #b7b7b7;
		}
	}

	& > div {
		width: 100%;
		height: fit-content;
		display: flex;
		justify-content: space-between;

		div {
			width: fit-content;
			display: flex;
			align-items: center;
		}

		svg {
			margin: 0 0 0 10px;
			cursor: pointer;
		}
	}
`;

const Snippet = styled.div`
	&& {
		width: 100%;
		height: 155px;
		display: flex;
		cursor: pointer;

		div {
			width: 100%;
			height: 100%;
			border-radius: 11px 0 0 11px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;

			h2 {
				font-size: 16px;
				color: #cecece;
			}

			p {
				font-size: 11px;
				color: #9b9595;
			}

			span {
				height: auto;
				font-size: 11px;
				color: #cecece;
				margin: 0;
			}
		}

		img {
			width: 153px;
			height: 155px;
			object-fit: fill;
			border-radius: 0 11px 11px 0;
			border: 1px solid #4d4d4d;
		}

		& > div {
			border: 1px solid #4d4d4d;
			border-right-width: 0;
			padding: 20px;
			justify-content: space-between;
		}
	}
`;

const DeleteModal = styled(Modal)`
	width: 100%;
	height: 100%;
	display: flex;

	& > div {
		width: 90%;
		max-width: 500px;
		height: 250px;
		margin: auto;
		border-radius: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		padding: 30px 0;
		background-color: #333333;
		font-family: "Lato", sans-serif;
		color: #ffffff;
		text-align: center;
		font-size: 28px;
		font-weight: 700;

		div {
			width: 100%;
			max-width: 338px;
			align-items: flex-start;
		}
	}
`;

const Buttons = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	button {
		width: 134px;
		height: 37px;
		border-radius: 5px;
		border: none;
		margin: 0 13px 0;
		background-color: #ffffff;
		color: #1877f2;
		font-family: "Lato", sans-serif;
		font-size: 16px;
		font-weight: 400;
		cursor: pointer;
	}

	button:hover {
		filter: brightness(0.9);
	}
`;

const Confirm = styled.button`
	&& {
		background-color: #1877f2;
		color: #ffffff;
		font-weight: 700;
	}
`;
