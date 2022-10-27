import styled from "styled-components";
import { useState, useEffect } from "react";
import * as service from "../../Services/linkr";
import { useMessage } from "../../Contexts/messageContext";
import { useParams } from "react-router-dom";

import MainStyle from "../Common/MainStyle";

import Posts from "../Posts/Posts";
import Hashtags from "../Hashtags/Hashtags";

export default function PostsUser() {
	const { id } = useParams();

	const [hasMorePosts, setHasMorePosts] = useState(true);
	const [update, setUpdate] = useState(false);
	const [disabled, setDisabled] = useState(false);
	const [posts, setPosts] = useState(false);
	const { setMessage } = useMessage();

	useEffect(() => {
		const promise = service.listPostsFromUser(id, 0);

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

			setPosts(data);
		});
	}, [update]);

	function listMorePosts(page) {
		const promise = service.listPostsFromUser(id, page);

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

			setPosts([...posts, ...data]);
		});
	}

	function followUser() {
		setDisabled(true);

		const promise = service.follow(id);

		promise.catch(() => {
			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: posts[0]?.followedByUser
						? `Não foi possível parar de seguir ${posts[0]?.from}.`
						: `Não foi possível seguir ${posts[0]?.from}.`,
				},
			});

			setDisabled(false);
		});

		promise.then(() => {
			setDisabled(false);
			setUpdate(!update);
		});
	}

	return (
		<MainStyle>
			<User
				followed={posts[0]?.followedByUser}
				isOwner={posts[0]?.owner !== undefined ? posts[0]?.owner : true}
			>
				<h1>{posts ? `${posts[0].from}'s posts` : "Loading..."}</h1>

				<button disabled={disabled} onClick={followUser}>
					{posts[0]?.followedByUser ? "Unfollow" : "Follow"}
				</button>
			</User>

			<div>
				<section>
					<Posts
						update={update}
						setUpdate={setUpdate}
						posts={posts}
						listMorePosts={listMorePosts}
						hasMorePosts={hasMorePosts}
					/>
				</section>

				<Hashtags update={update} />
			</div>
		</MainStyle>
	);
}

const User = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 0 43px;

	h1 {
		font-family: "Oswald", sans-serif;
		font-weight: 700;
		color: #ffffff;
		font-size: 43px;
	}

	button {
		width: 112px;
		height: 31px;
		background-color: ${(props) => (props.followed ? "#ffffff" : "#1877F2")};
		border: none;
		border-radius: 5px;
		color: ${(props) => (props.followed ? "#1877F2" : "#ffffff")};
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
		display: ${(props) => (props.isOwner ? "none" : "initial")};
	}

	button:hover,
	button:disabled {
		filter: brightness(0.7);
	}
`;
