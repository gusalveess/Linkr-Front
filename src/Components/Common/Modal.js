import styled from "styled-components";
import ReactModal from "react-modal";
import { ThreeDots as Loading } from "react-loader-spinner";

ReactModal.setAppElement(".root");

export default function Modal({
	modalIsOpen,
	setModalIsOpen,
	isLoading,
	textAction,
	textCancel,
	textConfirm,
	functionConfirm,
}) {
	return (
		<Wrapper isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
			{isLoading ? (
				<Loading color="#FFFFFF" height={13} width={51} />
			) : (
				<div>
					<div>
						<h1>{textAction}</h1>
					</div>

					<Buttons>
						<button onClick={() => setModalIsOpen(false)}>{textCancel}</button>

						<Confirm onClick={functionConfirm}>{textConfirm}</Confirm>
					</Buttons>
				</div>
			)}
		</Wrapper>
	);
}

const Wrapper = styled(ReactModal)`
	width: 100%;
	height: 100%;
	display: flex;

	& > div {
		width: 90%;
		max-width: 500px;
		height: auto;
		margin: auto;
		border-radius: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		padding: 30px 0;
		background-color: #333333;
		font-family: "Lato", sans-serif;
		color: #ffffff;
		text-align: center;
		font-size: 28px;
		font-weight: 700;

		div {
			width: 100%;
			max-width: 338px;
			align-items: flex-start;
		}
	}
`;

const Buttons = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 30px auto 0;

	button {
		width: 134px;
		height: 37px;
		border-radius: 5px;
		border: none;
		margin: 0 13px 0;
		background-color: #ffffff;
		color: #1877f2;
		font-family: "Lato", sans-serif;
		font-size: 16px;
		font-weight: 400;
		cursor: pointer;
	}

	button:hover {
		filter: brightness(0.9);
	}
`;

const Confirm = styled.button`
	&& {
		background-color: #1877f2;
		color: #ffffff;
		font-weight: 700;
	}
`;
