import styled from "styled-components";

import { useState } from "react";
import { TbSend as SendIcon } from "react-icons/tb";
import { useMessage } from "../../../Contexts/messageContext";
import * as service from "../../../Services/linkr";

export default function CreateComment({ postId, setUpdate, update }) {
	const [newComment, setNewComment] = useState("");
	const [disabled, setDisabled] = useState(false);
	const { setMessage } = useMessage();

	const userImage = JSON.parse(localStorage.getItem("linkr"))?.userImage;

	function postComment(event) {
		event.preventDefault();
		setDisabled(true);

		const promise = service.postComment({
			id: postId,
			comment: newComment,
		});

		promise.catch(() => {
			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: "Não foi possível comentar o post.",
				},
			});

			setDisabled(false);
		});

		promise.then(() => {
			setNewComment("");
			setDisabled(false);
			setUpdate(!update);
		});
	}

	return (
		<Wrapper>
			<img src={userImage} alt="user" />

			<form onSubmit={postComment}>
				<input
					type="text"
					placeholder="write a comment..."
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					disabled={disabled}
				/>

				<SendIcon
					size={20}
					color="#ffffff"
					onClick={
						disabled
							? () => {
									return;
							  }
							: postComment
					}
				/>
			</form>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	margin: 20px 0 0;
	display: flex;

	img {
		width: 39px;
		height: 39px;
		object-fit: cover;
		border-radius: 50%;
		margin: 0 14px 0 0;
	}

	form {
		width: 100%;
		height: auto;
		position: relative;

		svg {
			position: absolute;
			top: 11px;
			right: 10px;
			cursor: pointer;
		}
	}

	input {
		width: 100%;
		height: 39px;
		border: none;
		border-radius: 8px;
		background-color: #252525;
		padding: 0 37px 0 15px;
		font-size: 16px;
		color: #ffffff;
	}

	input::placeholder {
		font-style: italic;
		font-size: 14px;
		color: #575757;
	}

	@media (max-width: 380px) {
		img {
			width: 32px;
			height: 32px;
		}
	}
`;
