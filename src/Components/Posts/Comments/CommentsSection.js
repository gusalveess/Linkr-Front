import styled from "styled-components";
import { useState, useEffect } from "react";

import CreateComment from "./CreateComment";

export default function CommentsSection({ postId }) {
	const [update, setUpdate] = useState(true);

	return (
		<Wrapper>
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

		span {
			width: 100%;
			height: fit-content;
			font-size: 12px;
			overflow: hidden;
		}
	}
`;
