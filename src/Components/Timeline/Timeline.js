import styled from "styled-components";
import { useState, useEffect } from "react";
import * as service from "../../Services/linkr";
import { useMessage } from "../../Contexts/messageContext";

import MainStyle from "../Common/MainStyle";
import CreatePost from "./CreatePost";
import Posts from "../Posts/Posts";
import Hashtags from "../Hashtags/Hashtags";

export default function Timeline() {
	const [hasMorePosts, setHasMorePosts] = useState(true);
	const [update, setUpdate] = useState(false);
	const [postsData, setPostsData] = useState({ list: false });
	const { setMessage } = useMessage();

	useEffect(() => {
		const promise = service.listPosts(0);

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
			if (data.length < 10) {
				setHasMorePosts(false);
			}

			let text = "";

			if (Number(data[0].followeds) === 0) {
				text = "You don't follow anyone yet. Search for new friends!";
			} else if (!data[0].url) {
				text = "No posts found from your friends";
			}

			if (!data[0].url) {
				data = [];
			}

			setPostsData({ ...postsData, list: data, text });
		});
	}, [update]);

	function listMorePosts(page) {
		const promise = service.listPosts(page);

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
			if (!data[0].url) {
				data = [];
			}

			if (data.length < 10) {
				setHasMorePosts(false);
			}

			setPostsData({ ...postsData, list: [...postsData.list, ...data] });
		});
	}

	return (
		<MainStyle>
			<h1>timeline</h1>

			<div>
				<section>
					<CreatePost update={update} setUpdate={setUpdate} />

					<Text>{postsData.text}</Text>

					<Posts
						update={update}
						setUpdate={setUpdate}
						posts={postsData.list}
						listMorePosts={listMorePosts}
						hasMorePosts={hasMorePosts}
						text=""
					/>
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
