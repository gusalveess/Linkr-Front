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
	const [posts, setPosts] = useState(false);
	const { setMessage } = useMessage();

	useEffect(() => {
		const promise = service.listPostsId(id, 0);

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
		const promise = service.listPostsId(id, page);

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

	return (
		<MainStyle>
			<h1>{posts ? `${posts[0].from}'s posts` : "Loading..."}</h1>

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
