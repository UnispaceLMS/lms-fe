import styled from "styled-components";

import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextArea from "@common/TextArea";
import { PrimaryButton } from "@common/Buttons";

import { GRAY_200, WHITE } from "@constants/colors";

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  row-gap: 0.75rem;
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_200};
`;

const Assessment = () => {
  return (
    <AnnualPlanLayout>
      <FlexBox column rowGap="1.5rem">
        <Text weight={500} size="1.125rem">
          Assessment
        </Text>

        <Container>
          <Text size="0.875rem">Purpose/ Administration</Text>
          <TextArea rows={1} placeholder="Enter" />
        </Container>

        {/* TODO tables */}
      </FlexBox>
    </AnnualPlanLayout>
  );
};

export default Assessment;
