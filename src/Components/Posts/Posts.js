import styled from "styled-components";

import Post from "./Post";

export default function Posts({ update, setUpdate, posts }) {
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
	max-width: 611px;
	height: auto;
	display: flex;
	flex-direction: column;
	font-family: "Lato", sans-serif;
	margin: 0 auto;

	span {
		height: 40px;
		font-size: 20px;
		color: #ffffff;
		margin: auto;
	}
`;
