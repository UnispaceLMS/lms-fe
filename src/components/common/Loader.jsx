import styled, { keyframes } from "styled-components";

import FlexBox from "./FlexBox";

import { PRIMARY_600 } from "@constants/colors";

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: inline-block;
  border: 5px solid ${PRIMARY_600};
  border-bottom-color: transparent;
  animation: ${rotation} 1s linear infinite;
`;

const Loader = () => {
  return (
    <Wrapper>
      <Container />
    </Wrapper>
  );
};

export default Loader;
