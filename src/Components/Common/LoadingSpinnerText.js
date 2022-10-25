import styled from "styled-components";
import { Oval as LoaderSpinner } from "react-loader-spinner";

export default function LoadingSpinnerText({text}) {
return (
<Wrapper>
<LoaderSpinner
        height={36}
  width={36}
  color="#6D6D6D"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  ariaLabel='oval-loading'
  secondaryColor="none"
  strokeWidth={2}
  strokeWidthSecondary={2}
      />
<span key={0}>{text}</span>
</Wrapper>
)
}


const Wrapper = styled.div`
&& {
width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
		color: #6D6D6D;
margin: 80px auto 0;

	span {
width: fit-content;
		font-size: 20px;
color: #6D6D6D;
		margin: 16px auto 0;
	}
}
`;
