import styled from "styled-components";

function MainStyle({ children }) {
	return <Main>{children}</Main>;
}

export default MainStyle;

const Main = styled.main`
	width: fit-content;
	align-items: flex-start;
	margin: 78px auto 0;
	transition: all 0.2s linear;

	& > h1 {
		font-family: "Oswald", sans-serif;
		font-weight: 700;
		color: #ffffff;
		font-size: 43px;
		margin: 0 0 43px;
	}

	& > div > section {
		width: 611px;
		display: flex;
		flex-direction: column;
	}

	& > div {
		display: flex;
		flex-direction: row;
	}

	@media (max-width: 611px) {
		width: 100%;
		align-items: center;

		& > div > section {
			width: 100%;
		}
	}
`;
