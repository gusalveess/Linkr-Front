import styled from "styled-components";

import { useState, useEffect } from "react";
import { useMessage } from "../../Contexts/messageContext";

export default function Alert() {
	const [config, setConfig] = useState({ opacity: 0, right: "-260px" });
	const { message, setMessage } = useMessage();

	useEffect(() => {
		if (message.type !== "alert") return null;

		setTimeout(() => {
			setConfig({ opacity: 1, right: "30px" });
		}, 100);

		setTimeout(() => {
			setConfig({ opacity: 0, right: "-260px" });
		}, 4000);

		setTimeout(() => {
			setMessage({ type: "" });
		}, 4500);
	}, [message?.message?.text]);

	if (message.type !== "alert") return null;

	const { text, type } = message.message;

	let color = "#000000";

	switch (type) {
		case "error":
			color = "lightcoral";
			break;
		case "success":
			color = "#80CC74";
			break;
		case "warning":
			color = "rgb(239 199 58)";
			break;

		default:
			break;
	}

	return (
		<Wrapper opacity={config.opacity} right={config.right} color={color}>
			{text}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	width: fit-content;
	max-width: 250px;
	background-color: ${(props) => props.color};
	position: fixed;
	bottom: 20px;
	right: ${(props) => props.right};
	opacity: ${(props) => props.opacity};
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
	border-radius: 7px 7px 0 7px;
	box-shadow: -1px 2px 6px 0 rgb(0, 0, 0, 0.3);
	font-size: 18px;
	line-height: 20px;
	color: #ffffff;
	text-align: center;
	font-family: "Oswald", sans-serif;
	transition: all 0.2s linear;
	z-index: 3;
`;
