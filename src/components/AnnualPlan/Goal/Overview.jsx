import styled from "styled-components";

import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextArea from "@common/TextArea";
import { PrimaryButton } from "@common/Buttons";

import { WHITE, GRAY_200 } from "@constants/colors";

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  row-gap: 0.75rem;
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_200};
`;

const Overview = () => {
  return (
    <AnnualPlanLayout>
      <FlexBox column width="100%" rowGap="1.5rem">
        <Text size="1.125rem">Goal</Text>

        <Text size="1.125rem">Overview</Text>

        <FlexBox column rowGap="0.75rem" align="flex-end">
          <Container>
            <Text size="1.125rem">Independent Living</Text>

            <TextArea rows={1} placeholder="Enter" />

            <Text size="1.125rem">College/Education</Text>

            <TextArea rows={1} placeholder="Enter" />

            <Text size="1.125rem">Community Participation</Text>

            <TextArea rows={1} placeholder="Enter" />

            <Text size="1.125rem">Career/Employment</Text>

            <TextArea rows={1} placeholder="Enter" />
          </Container>

          <PrimaryButton>Save</PrimaryButton>
        </FlexBox>
      </FlexBox>
    </AnnualPlanLayout>
  );
};

export default Overview;
