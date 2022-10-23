import { useState, useEffect } from "react";
import * as service from "../../Services/linkr";
import { useMessage } from "../../Contexts/messageContext";
import { useParams } from "react-router-dom";

import MainStyle from "../Common/MainStyle";

import Posts from "../Posts/Posts";
import Hashtags from "../Hashtags/Hashtags";

export default function PostsUser(){
    const { id } = useParams();

	const [update, setUpdate] = useState(false);
	const [posts, setPosts] = useState(false);
	const { setMessage } = useMessage();

	useEffect(() => {
		const promise = service.listPostsId(id);

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
			<h1>{posts ? `${posts[0].from}'s posts`: "Loading..."}</h1>

			<div>
				<section>
					<Posts update={update} setUpdate={setUpdate} posts={posts} />
				</section>

				<Hashtags update={update} />
			</div>
		</MainStyle>
	);
}

