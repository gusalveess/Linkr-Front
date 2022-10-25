import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as service from "../../Services/linkr";
import { useMessage } from "../../Contexts/messageContext";

import MainStyle from "../Common/MainStyle";
import Posts from "../Posts/Posts";
import Hashtags from "./Hashtags";

export default function HashtagPage() {
	const [hasMorePosts, setHasMorePosts] = useState(true);
	const [update, setUpdate] = useState(false);
	const [posts, setPosts] = useState(false);
	const { setMessage } = useMessage();

	const { hashtag } = useParams();

	useEffect(() => {
		const promise = service.listPostsWithHashtag(hashtag, 0);

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
	}, [hashtag, update]);

	function listMorePosts(page) {
		const promise = service.listPostsWithHashtag(hashtag, page);

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
			<h1># {hashtag}</h1>

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
