import styled from "styled-components";

import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import { PrimaryButton } from "@common/Buttons";

import { GRAY_200, WHITE } from "@constants/colors";

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  row-gap: 0.75rem;
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_200};
`;

const Vision = () => {
  return (
    <AnnualPlanLayout>
      <FlexBox column rowGap="1.5rem">
        <Text weight={500} size="1.125rem">
          Student Post-Secondary Vision
        </Text>

        <Container>
          <Text weight={500} size="1.125rem">
            Career/Employment Goals
          </Text>
          <TextInput placeholder="Enter" />

          <Text weight={500} size="1.125rem">
            Independent Living Goals
          </Text>
          <TextInput placeholder="Enter" />

          <Text weight={500} size="1.125rem">
            Community Participation
          </Text>
          <TextInput placeholder="Enter" />

          <Text weight={500} size="1.125rem">
            Post-Secondary Education/Training
          </Text>
          <TextInput placeholder="Enter" />
        </Container>

        <PrimaryButton>Save</PrimaryButton>
      </FlexBox>
    </AnnualPlanLayout>
  );
};

export default Vision;
