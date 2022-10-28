import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Comment({
	picture,
	username,
	author,
	followedByUser,
	comment,
	userId,
}) {
	let info = "";

	if (author === username) {
		info = " • post's author";
	} else if (!!followedByUser) {
		info = " • following";
	}

	return (
		<Wrapper>
			<img src={picture} alt="user" />

			<div>
				<span>
					<Link to={`/user/${userId}`}>{username}</Link>
					{info}
				</span>

				<p>{comment}</p>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	&& {
		width: 100%;
		height: auto;
		display: flex;
		align-items: center;
		padding: 15px 0;
		border-bottom: 1px solid #353535;
		font-size: 14px;

		img {
			width: 39px;
			height: 39px;
			object-fit: cover;
			border-radius: 50%;
		}

		div {
			width: 95%;
			margin: 0 0 0 18px;

			span {
				font-size: 14px;
				color: #565656;

				a {
					color: #f3f3f3;
				}
			}
		}

		p {
			color: #acacac;
			margin: 5px 0 0 0;
		}
	}
`;
