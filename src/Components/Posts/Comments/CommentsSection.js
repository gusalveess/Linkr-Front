import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

import { useMessage } from "../../../Contexts/messageContext";
import * as service from "../../../Services/linkr";
import LoadingSpinner from "../../Common/LoadingSpinner";

import CreateComment from "./CreateComment";
import Comment from "./Comment";

export default function CommentsSection({ postId }) {
	const [update, setUpdate] = useState(true);
	const [comments, setComments] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { setMessage } = useMessage();

	const scrollToLast = useRef(null);

	useEffect(() => {
		const promise = service.listComments(postId);

		promise.catch(() => {
			if (isLoading) {
				setIsLoading(false);
			}

			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: "Não foi possível buscar os comentários do post.",
				},
			});
		});

		promise.then(({ data }) => {
			if (isLoading) {
				setIsLoading(false);
			}
			setComments(data);
		});
	}, [update]);

	useEffect(() => {
		scrollToLast.current?.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
		});
	}, [comments]);

	return (
		<Wrapper>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<Comments>
					{comments.map((comment, index) => (
						<Comment key={index} {...comment} />
					))}

					<div ref={scrollToLast} />
				</Comments>
			)}

			<CreateComment postId={postId} setUpdate={setUpdate} update={update} />
		</Wrapper>
	);
}

const Wrapper = styled.div`
	&& {
		width: 100%;
		height: auto;
		padding: 20px;
		margin: 0 0 16px 0;
		border-radius: 0 0 15px 15px;
		background-color: #1e1e1e;
		transform: translateY(-10px);
		position: relative;
		z-index: 0;

		span {
			width: 100%;
			height: fit-content;
			font-size: 12px;
			overflow: hidden;
		}
	}
`;

const Comments = styled.div`
	height: auto;
	max-height: 200px;
	overflow-y: scroll;

	&::-webkit-scrollbar {
		width: 5px;
	}

	&::-webkit-scrollbar-track {
		width: 5px;
		border-radius: 3px;
		background-color: #353535;
	}

	&::-webkit-scrollbar-thumb {
		border-radius: 3px;
		background-color: #171717;
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: #171717;
		filter: brightness(1.5);
	}
`;
