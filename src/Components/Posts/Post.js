import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ReactHashtag from "@mdnm/react-hashtag";
import { TiPencil as EditIcon } from "react-icons/ti";
import { FaTrash as TrashIcon } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io"; //ESSE
import { AiFillHeart } from "react-icons/ai";

import { useMessage } from "../../Contexts/messageContext";
import * as service from "../../Services/linkr";
import DeleteModal from "../Common/Modal";

export default function Post({ post, update, setUpdate }) {
	const [description, setDescription] = useState(post.description);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [linkData, setLinkData] = useState({});
	const [like, setLike] = useState(true);

	const { setMessage } = useMessage();

	const editRef = useRef();

	const heart = { color: "white", fontSize: "1.5em" };

	useEffect(() => {
		const promise = axios.get(`https://api.microlink.io/?url=${post.url}`);

		promise.then(({ data }) => setLinkData(data.data));
	}, [post.url]);

	useEffect(() => {
		setDescription(post.description);
	}, [post.description]);

	function deletePostFunction() {
		setIsLoading(true);

		const promise = service.deletePost(post.id);

		promise.catch(() => {
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

		promise.then(() => {
			setModalIsOpen(false);
			setIsLoading(false);
			setUpdate(!update);
		});
	}

	function editPost() {
		setDisabled(true);

		const descriptionArray = description.split(" ");
		const tags = [];

		descriptionArray.forEach((word) => {
			if (word[0] === "#") {
				tags.push(word.slice(1).toLowerCase());
			}
		});

		const promise = service.editPost({
			id: post.id,
			body: { description, tags },
		});

		promise.catch(() => {
			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: "Não foi possível editar o post.",
				},
			});

			setDisabled(false);
		});

		promise.then(() => {
			setUpdate(!update);
		});
	}

	function editDescription() {
		if (disabled) {
			setDisabled(false);

			setTimeout(() => editRef.current.focus(), 100);
		} else {
			setDisabled(true);
			setDescription(post.description);
		}
	}

	function onKeyPress(event) {
		if (event.key === "Esc") {
			setDisabled(true);
		} else if (event.key === "Enter") {
			editPost();
		}
	}

	return (
		<>
			<DeleteModal
				modalIsOpen={modalIsOpen}
				setModalIsOpen={setModalIsOpen}
				isLoading={isLoading}
				textAction="Are you sure you want to delete this post?"
				textCancel="No, go back"
				textConfirm="Yes, delete it"
				functionConfirm={deletePostFunction}
			/>

			<Wrapper>
				<User>
					<Link to={`/user/${post.userId}`}>
						<img src={post.userImage} alt="user" />
					</Link>
					{like ? (
						<h3>
							<IoMdHeartEmpty size="30px" onClick={() => setLike(false)} />
						</h3>
					) : (
						<h3>
							<AiFillHeart
								size="30px"
								color="red"
								onClick={() => setLike(true)}
							/>
						</h3>
					)}{" "}
					{/*/////////////////////////////////////////////////// */}
					<h4>0 likes</h4>
				</User>

				<PostData>
					<div>
						<Link to={`/user/${post.userId}`}>
							<h2>{post.from}</h2>
						</Link>

						<div>
							{post.owner ? (
								<>
									<EditIcon size="20px" onClick={editDescription} />
									<TrashIcon size="15px" onClick={() => setModalIsOpen(true)} />
								</>
							) : (
								""
							)}
						</div>
					</div>

					{disabled ? (
						<p>
							<ReactHashtag
								renderHashtag={(hashtagValue) => (
									<Link
										to={`/hashtag/${hashtagValue?.slice(1)?.toLowerCase()}`}
									>
										{hashtagValue?.toLowerCase()}
									</Link>
								)}
							>
								{description}
							</ReactHashtag>
						</p>
					) : (
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							ref={editRef}
							onKeyPress={onKeyPress}
							disabled={disabled}
						/>
					)}

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

	a {
		color: #ffffff;
		font-weight: 700;
	}

	@media (max-width: 611px) {
		border-radius: 0;

		h2 {
			font-size: 17px;
		}
	}
`;

const User = styled.div`
	width: fit-content;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 10px 0 0;

	/////////////////////////////////////
	h3 {
		margin-left: 10px;
		margin-top: 10px;
	}
	h4 {
		font-family: "Lato", sans-serif;
		font-size: 11px;
	}
	/////////////////////////////////////

	img {
		width: 50px;
		height: 50px;
		object-fit: cover;
		border-radius: 50%;
	}

	@media (max-width: 611px) {
		img {
			width: 40px;
			height: 40px;
		}

		svg {
			width: 20px;
			height: 20px;
		}
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
			background-color: #ffffff;
			border: none;
			resize: none;
			font-family: "Lato", sans-serif;
			font-size: 17px;
			color: #4c4c4c;
			margin: 7px 0 3px;
			padding: 3px 8px;
		}

		textarea:disabled {
			background-color: transparent;
			color: #b7b7b7;
		}

		& > p {
			width: 100%;
			height: auto;
			font-size: 17px;
			color: #b7b7b7;
			margin: 3px 0 12px;
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

		@media (max-width: 611px) {
			textarea,
			p {
				font-size: 15px;
				line-height: 15px;
			}

			& > div {
				div {
					width: 100%;
					justify-content: flex-end;
				}
			}
		}
	}
`;

const Snippet = styled.div`
	&& {
		&& {
			width: 100%;
			height: 155px;
			display: flex;
			cursor: pointer;
			align-items: flex-start;

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

			@media (max-width: 611px) {
				width: 100%;
				height: auto;

				img {
					width: 95px;
					height: 115px;
					object-fit: contain;
				}

				& > div {
					width: 100%;
					height: 115px;
					padding: 10px;

					div {
						justify-content: flex-start;
					}
				}

				h2 {
					font-size: 11px;
					align-self: flex-start;
				}

				p {
					margin-bottom: 5px;
					max-height: 45px;
					overflow: hidden;
				}

				span,
				p {
					font-size: 9px;
					align-self: flex-start;
				}
			}
		}
	}
`;
