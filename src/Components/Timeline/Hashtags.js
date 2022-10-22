import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as service from "../../Services/linkr";
import { useMessage } from "../../Contexts/messageContext";

export default function Hashtags({ update }) {
	const [hashtags, setHashtags] = useState([]);
	const { setMessage } = useMessage();

	useEffect(() => {
		const promise = service.listHashtags();

		promise.catch(() => {
			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: "An error occured while trying to fetch the hashtags, please refresh the page.",
				},
			});
		});

		promise.then(({ data }) => {
			setHashtags(data);
		});
	}, [update]);

	return (
		<Wrapper>
			<h1>trending</h1>

			<div></div>

			<ul>
				{hashtags.map((hashtag, index) => (
					<li key={index}>
						<Link to={`/hashtag/${hashtag.name}`}># {hashtag.name}</Link>
					</li>
				))}
			</ul>
		</Wrapper>
	);
}
const Wrapper = styled.div`
	width: 301px;
	height: 400px;
	display: flex;
	flex-direction: column;
	border-radius: 15px;
	background-color: #171717;
	font-family: "Lato", sans-serif;
	margin: 0 0 0 25px;
	display: initial;

	& > h1 {
		width: 90%;
		height: 44px;
		margin: 15px auto 0;
		font-family: "Oswald", sans-serif;
		font-weight: 700;
		color: #ffffff;
		font-size: 27px;
	}

	& > div {
		width: 100%;
		height: 1px;
		background-color: #484848;
	}

	& > ul {
		width: 90%;
		margin: 17px auto;
		font-family: "Oswald", sans-serif;
		font-weight: 700;
		color: #ffffff;
		font-size: 27px;
		overflow: hidden;
	}

	& > li,
	a {
		height: 30px;
		font-family: "Lato", sans-serif;
		font-weight: 700;
		color: #ffffff;
		font-size: 19px;
	}

	@media (max-width: 937px) {
		display: none;
	}
`;
