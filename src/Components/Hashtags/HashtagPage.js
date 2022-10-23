import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as service from "../../Services/linkr";
import { useMessage } from "../../Contexts/messageContext";

import MainStyle from "../Common/MainStyle";
import Posts from "../Posts/Posts";
import Hashtags from "./Hashtags";

export default function HashtagPage() {
	const [update, setUpdate] = useState(false);
	const [posts, setPosts] = useState(false);
	const { setMessage } = useMessage();

	const { hashtag } = useParams();

	useEffect(() => {
		const promise = service.listPostsWithHashtag(hashtag);

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
	}, [hashtag, update]);

	return (
		<MainStyle>
			<h1># {hashtag}</h1>

			<div>
				<section>
					<Posts update={update} setUpdate={setUpdate} posts={posts} />
				</section>

				<Hashtags update={update} />
			</div>
		</MainStyle>
	);
}
