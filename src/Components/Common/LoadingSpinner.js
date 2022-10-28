import styled from "styled-components";
import { Oval as LoaderSpinner } from "react-loader-spinner";

export default function LoadingSpinner({ size = 36 }) {
	return (
		<Wrapper>
			<LoaderSpinner
				height={size}
				width={size}
				color="#6D6D6D"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel="oval-loading"
				secondaryColor="none"
				strokeWidth={2}
				strokeWidthSecondary={2}
			/>
		</Wrapper>
	);
}

const Wrapper = styled.div`
	&& {
		width: fit-content;
		margin: 20px auto;
	}
`;
