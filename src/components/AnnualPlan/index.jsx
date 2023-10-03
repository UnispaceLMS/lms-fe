import styled from "styled-components";

import FlexBox from "@common/FlexBox";
import SecondarySidebar from "./SecondarySidebar";

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
`;

const SideContainer = styled(FlexBox)`
  flex: 1;
  flex-direction: column;
`;

const AnnualPlan = () => {
  return (
    <Wrapper>
      <SecondarySidebar />
      <SideContainer></SideContainer>
    </Wrapper>
  );
};

export default AnnualPlan;
