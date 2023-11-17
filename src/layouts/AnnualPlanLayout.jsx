import styled from "styled-components";
import { useSelector } from "react-redux";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import NameInitials from "@common/NameInitials";

import { buildName } from "@utils/helpers";
import { PRIMARY_25 } from "@constants/colors";

const Wrapper = styled(FlexBox)`
  flex: 1;
  overflow: auto;
  row-gap: 1.5rem;
  max-height: 100vh;
  position: relative;
  flex-direction: column;
  padding: 3.5rem 4rem 1.5rem;
  background-color: ${PRIMARY_25};
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
  const student = useSelector(state => state?.student?.profile);

  const { firstName, middleName, lastName } = student || {};
  const name = buildName(firstName, middleName, lastName);

  return (
    <Wrapper>
      <Header>
        <Text weight={500} size="1.125rem">
          Annual Plan
        </Text>

        <FlexBox align="center" colGap="2rem">
          <Text weight={500} size="0.875rem" transform="capitalize">
            {name}
          </Text>

          <NameContainer>
            <NameInitials name={name} fontSize="0.75rem" />
          </NameContainer>
        </FlexBox>
      </Header>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default AnnualPlanLayout;
