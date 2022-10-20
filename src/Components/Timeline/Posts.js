import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

import Post from "./Post";

export default function Posts({ update, setUpdate }) {
	const [posts, setPosts] = useState(false);

	let user = JSON.parse(localStorage.getItem("linkr"));

	useEffect(() => {
		const URL = "http://localhost:4000/posts";

		const config = {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		};

		const promise = axios.get(URL, config);

		promise.catch(() => {
			alert(
				"An error occured while trying to fetch the posts, please refresh the page."
			);
		});

		promise.then(({ data }) => {
			setPosts(data);
		});
	}, [update]);

	return (
		<Container>
			{posts ? (
				posts.length === 0 ? (
					<span>There are no posts yet</span>
				) : (
					posts.map((post, index) => (
						<Post
							key={index}
							post={post}
							update={update}
							setUpdate={setUpdate}
						/>
					))
				)
			) : (
				<span>Loading...</span>
			)}
		</Container>
	);
}

const Container = styled.section`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	font-family: "Lato", sans-serif;
	margin: 30px auto 0;

	span {
		height: 40px;
		font-size: 20px;
		color: #ffffff;
		margin: auto;
	}
`;