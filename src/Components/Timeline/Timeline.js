import styled from "styled-components";
import { useState, useEffect } from "react";
import { useInterval } from "use-interval";
import { GoSync as SyncIcon } from "react-icons/go";
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
	const [newPosts, setNewPosts] = useState([]);
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

	useInterval(() => {
		if (Number(postsData.list[0]?.id)) {
			const promise = service.listPostsAfterId(postsData.list[0].id);

			promise.catch(() => {
				setMessage({
					type: "alert",
					message: {
						type: "error",
						text: `An error occured while trying to fetch the new posts,
							please refresh the page.`,
					},
				});
			});

			promise.then(({ data }) => {
				setNewPosts(data);
			});
		}
	}, 15000);

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

	function loadNewPosts() {
		const oldData = postsData.list;
		setPostsData({ ...postsData, list: [...newPosts, ...oldData] });
		setNewPosts([]);
	}

	return (
		<MainStyle>
			<h1>timeline</h1>

			<div>
				<section>
					<CreatePost update={update} setUpdate={setUpdate} />

					{newPosts.length > 0 ? (
						<NewPosts onClick={loadNewPosts}>
							<span>{`${newPosts.length} new posts, load more!`}</span>

							<SyncIcon size={20} />
						</NewPosts>
					) : (
						""
					)}

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

const NewPosts = styled.button`
	width: 100%;
	height: 61px;
	border-radius: 15px;
	border: none;
	box-shadow: 0 4px 4px 0 rgb(0 0 0 / 25%);
	margin: 30px auto 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #1877f2;
	font-size: 16px;
	color: #ffffff;
	cursor: pointer;

	span {
		margin: 0 14px 0 0;
	}

	&:hover {
		filter: brightness(0.8);
	}

	&:active {
		transform: translateY(2px);
	}
`;
