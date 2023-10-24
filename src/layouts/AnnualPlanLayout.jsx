import styled from "styled-components";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import NameInitials from "@common/NameInitials";

const Wrapper = styled(FlexBox)`
  flex: 1;
  overflow: auto;
  row-gap: 1.5rem;
  max-height: 100vh;
  flex-direction: column;
  padding: 3.5rem 4rem 1.5rem;
`;

const Header = styled(FlexBox)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const NameContainer = styled(FlexBox)`
  width: 2rem;
  height: 2rem;
`;

const Container = styled(FlexBox)`
  flex: 1;
  flex-direction: column;
`;

const AnnualPlanLayout = ({ children }) => {
  return (
    <Wrapper>
      <Header>
        <Text weight={500} size="1.125rem">
          Annual Plan
        </Text>

        <FlexBox align="center" colGap="2rem">
          <Text weight={500} size="0.875rem">
            Cami Henderson
          </Text>

          <NameContainer>
            <NameInitials name="Cami Henderson" fontSize="0.75rem" />
          </NameContainer>
        </FlexBox>
      </Header>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default AnnualPlanLayout;
