import styled from "styled-components";

import { useState } from "react";

import CreatePost from "./CreatePost";
import Posts from "./Posts";

export default function Timeline() {
	const [update, setUpdate] = useState(false);

	return (
		<Main>
			<h1>timeline</h1>

			<CreatePost update={update} setUpdate={setUpdate} />
			<Posts update={update} setUpdate={setUpdate} />
		</Main>
	);
}

const Main = styled.main`
	max-width: 611px;
	flex-direction: column;
	align-items: flex-start;
	margin: 78px auto 0;
	transition: all 0.2s linear;

	& > h1 {
		font-family: "Oswald", sans-serif;
		font-weight: 700;
		color: #ffffff;
		font-size: 43px;
		margin: 0 0 43px;
	}

	@media (max-width: 611px) {
		max-width: 100%;
		align-items: center;
	}
`;
