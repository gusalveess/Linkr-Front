import styled from "styled-components";

import { useState } from "react";

import CreatePost from "./CreatePost";
import Posts from "./Posts";
import Hashtags from "./Hashtags";

export default function Timeline() {
	const [update, setUpdate] = useState(false);

	return (
		<Main>
			<h1>timeline</h1>

			<div>
				<section>
					<CreatePost update={update} setUpdate={setUpdate} />
					<Posts update={update} setUpdate={setUpdate} />
				</section>

				<Hashtags update={update} />
			</div>
		</Main>
	);
}

const Main = styled.main`
	width: fit-content;
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

	& > div > section {
		width: 611px;
		display: flex;
		flex-direction: column;
	}

	& > div {
		display: flex;
		flex-direction: row;
	}

	@media (max-width: 611px) {
		width: 100%;
		align-items: center;

		& > div > section {
			width: 100%;
		}
	}
`;
