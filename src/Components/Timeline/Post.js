import styled from "styled-components";
import axios from "axios";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Post({ post, update, setUpdate }) {
	const [linkData, setLinkData] = useState({});

	useEffect(() => {
		const promise = axios.get(`https://api.microlink.io/?url=${post.url}`);

		promise.then(({ data }) => setLinkData(data.data));
	}, [update]);

	return (
		<Wrapper>
			<div>
				<img src={post.userImage} href="user" />
			</div>

			<PostData>
				<h2>{post.from}</h2>

				<textarea defaultValue={post.description} />

				<Link to={post.url}>
					{linkData.title ? (
						<Snippet>
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
				</Link>
			</PostData>
		</Wrapper>
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

		a {
			height: 155px;
			width: 500px;
		}
	}
`;

const Snippet = styled.div`
	&& {
		width: 100%;
		height: 155px;
		display: flex;

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

			& > div {
				border: 1px solid #4d4d4d;
				border-right-width: 0;
				padding: 20px;
				justify-content: space-between;
			}
		}
	}
`;
