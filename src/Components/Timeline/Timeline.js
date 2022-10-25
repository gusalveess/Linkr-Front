import styled from "styled-components";
import { useState, useEffect } from "react";
import * as service from "../../Services/linkr";
import { useMessage } from "../../Contexts/messageContext";

import MainStyle from "../Common/MainStyle";
import CreatePost from "./CreatePost";
import Posts from "../Posts/Posts";
import Hashtags from "../Hashtags/Hashtags";

export default function Timeline() {
	const [update, setUpdate] = useState(false);
	const [posts, setPosts] = useState(false);
	const { setMessage } = useMessage();

	useEffect(() => {
		const promise = service.listPosts();

		promise.catch(() => {
			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: "An error occured while trying to fetch the posts, please refresh the page.",
				},
			});
		});

		promise.then(({ data }) => {
			setPosts(data);
		});
	}, [update]);

	return (
		<MainStyle>
			<h1>timeline</h1>

			<div>
				<section>
					<CreatePost update={update} setUpdate={setUpdate} />

					{posts === false ? (
						<Posts update={update} setUpdate={setUpdate} posts={posts} />
					) : posts[0].followeds !== "0" && posts[0].url ? (
						<Posts update={update} setUpdate={setUpdate} posts={posts} />
					) : posts[0].followeds !== "0" && !posts[0].url ? (
						<Text>No posts found from your friends</Text>
					) : posts[0].followeds === "0" && !posts[0].url ? (
						<Text>You don't follow anyone yet. Search for new friends!</Text>
					) : (
						<>
							<Text>You don't follow anyone yet. Search for new friends!</Text>
							<Posts update={update} setUpdate={setUpdate} posts={posts} />
						</>
					)}
				</section>

				<Hashtags update={update} />
			</div>
		</MainStyle>
	);
}

const Text = styled.span`
	width: fit-content;
	height: 40px;
	font-size: 20px;
	color: #ffffff;
	margin: auto;
`;
