import styled from "styled-components";

import FlexBox from "@common/FlexBox";

const Wrapper = styled(FlexBox)`
  width: 100%;
  row-gap: 4rem;
  overflow: auto;
  max-height: 100%;
  padding: 5rem 2.5rem;
  flex-direction: column;
`;

export default Wrapper;
