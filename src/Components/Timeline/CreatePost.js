import styled from "styled-components";
import { useState } from "react";
import * as service from "../../Services/linkr";
import { useMessage } from "../../Contexts/messageContext";

export default function CreatePost({ update, setUpdate }) {
	const [form, setForm] = useState({ url: "", description: "", tags: [] });
	const [disabled, setDisabled] = useState(false);
	const { setMessage } = useMessage();

	let user = JSON.parse(localStorage.getItem("linkr"));

	function handleForm(event) {
		event.preventDefault();

		if (!form.description) {
			delete form.description;
		} else {
			const descriptionArray = form.description.split(" ");

			descriptionArray.forEach((word) => {
				if (word[0] === "#") {
					form.tags.push(word.slice(1).toLowerCase());
				}
			});
		}

		setDisabled(true);

		const promise = service.createPost(form);

		promise.catch(() => {
			setMessage({
				type: "alert",
				message: {
					type: "error",
					text: "Houve um erro ao publicar seu link.",
				},
			});

			setDisabled(false);
		});

		promise.then(() => {
			setForm({ url: "", description: "", tags: [] });
			setDisabled(false);
			setUpdate(!update);
		});
	}

	function updateForm({ name, value }) {
		setForm({ ...form, [name]: value });
	}

	return (
		<Container>
			<div>
				<img src={user.userImage} alt="user" />
			</div>

			<Form onSubmit={handleForm}>
				<h2>What are you going to share today?</h2>

				<input
					required
					type="url"
					name="url"
					placeholder="http://..."
					value={form.url}
					onChange={(e) =>
						updateForm({ name: e.target.name, value: e.target.value })
					}
					disabled={disabled}
				/>

				<textarea
					name="description"
					value={form.description}
					placeholder="Awesome article about #javascript"
					onChange={(e) =>
						updateForm({ name: e.target.name, value: e.target.value })
					}
					disabled={disabled}
				/>

				<button disabled={disabled}>
					{disabled ? "Publishing..." : "Publish"}
				</button>
			</Form>
		</Container>
	);
}

const Container = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	color: #ffffff;
	background-color: #ffffff;
	border-radius: 15px;
	box-shadow: 0 4px 4px 0 rgb(0, 0, 0, 0.25);
	padding: 18px;
	margin: 0 auto 30px;
	color: #707070;
	font-weight: 300;
	font-size: 17px;
	font-family: "Lato", sans-serif;

	h2 {
		height: 40px;
		font-size: 20px;
	}

	div {
		width: 68px;
		height: 100%;

		img {
			width: 50px;
			height: 50px;
			object-fit: cover;
			border-radius: 50%;
		}
	}
`;

const Form = styled.form`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;

	input,
	textarea {
		width: 100%;
		height: 30px;
		margin-bottom: 5px;
		border: none;
		outline: none;
		border-radius: 5px;
		padding: 0 13px;
		background-color: #efefef;
		font-size: 15px;
		color: #949494;
		font-family: "Lato", sans-serif;
		font-weight: 300;

		-webkit-box-shadow: 0 0 0 30px #efefef inset;
		-webkit-text-fill-color: #949494;
	}

	textarea {
		height: 66px;
		padding: 8px 13px;
		resize: none;
	}

	button {
		width: 112px;
		height: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		align-self: flex-end;
		border-radius: 5px;
		border: none;
		background: #1877f2;
		color: #ffffff;
		font-size: 14px;
		font-weight: 700;
		cursor: pointer;
	}

	button:hover,
	button:disabled {
		filter: brightness(0.8);
	}
`;
