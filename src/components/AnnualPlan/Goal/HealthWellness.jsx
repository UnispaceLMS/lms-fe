import styled from "styled-components";

import AnnualPlanLayout from "@/layouts/AnnualPlanLayout";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import { PrimaryButton } from "@common/Buttons";

import { WHITE, GRAY_200 } from "@constants/colors";

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  row-gap: 1.5rem;
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_200};
`;

const HealthWellness = () => {
  return (
    <AnnualPlanLayout>
      <FlexBox column width="100%" rowGap="1.5rem">
        <Text weight={500} size="1.125rem">
          Goals
        </Text>

        <Container>
          <Text weight={500} size="1.125rem">
            Goals
          </Text>

          <FlexBox column rowGap="0.75rem">
            <Text weight={500} size="0.875rem">
              Annual Goal
            </Text>
            <TextInput placeholder="Enter" />
          </FlexBox>
        </Container>

        <FlexBox column rowGap="0.75rem" align="flex-end">
          {/* TODO add table */}
          <PrimaryButton>Save</PrimaryButton>
        </FlexBox>
      </FlexBox>
    </AnnualPlanLayout>
  );
};

export default HealthWellness;
