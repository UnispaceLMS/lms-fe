import styled from "styled-components";

import FlexBox from "@common/FlexBox";

import SecondarySidebar from "@components/SecondarySidebar";

const Wrapper = styled(FlexBox)`
  flex: 1;
`;

const SideContainer = styled(FlexBox)`
  flex: 1;
  overflow: auto;
  max-height: 100vh;
`;

const GoalPageLayout = ({ children }) => {
  return (
    <Wrapper>
      <SecondarySidebar />
      <SideContainer>{children}</SideContainer>
    </Wrapper>
  );
};

export default GoalPageLayout;
