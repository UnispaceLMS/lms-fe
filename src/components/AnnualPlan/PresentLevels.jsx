import styled from "styled-components";

import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
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

const PresentLevels = () => {
  return (
    <AnnualPlanLayout>
      <FlexBox column rowGap="1.5rem">
        <Text weight={500} size="1.125rem">
          Present Levels
        </Text>

        <Container>
          <Text weight={500} size="1.125rem">
            Academic Achievement
          </Text>
          <TextInput placeholder="Enter" />

          <Text weight={500} size="0.875rem">
            Impact and Resulting Need
          </Text>
          <TextInput placeholder="Enter" />
        </Container>

        <Container>
          <Text weight={500} size="1.125rem">
            Employment/Career Skills
          </Text>
          <TextInput placeholder="Enter" />

          <Text weight={500} size="0.875rem">
            Impact and Resulting Need
          </Text>
          <TextInput placeholder="Enter" />
        </Container>

        <Container>
          <Text weight={500} size="1.125rem">
            Independent Living Skills
          </Text>
          <TextInput placeholder="Enter" />

          <Text weight={500} size="0.875rem">
            Impact and Resulting Need
          </Text>
          <TextInput placeholder="Enter" />
        </Container>

        <FlexBox column rowGap="0.75rem" align="flex-end">
          <Container>
            <Text weight={500} size="1.125rem">
              Community Participation Skills
            </Text>
            <TextInput placeholder="Enter" />

            <Text weight={500} size="0.875rem">
              Impact and Resulting Need
            </Text>
            <TextInput placeholder="Enter" />
          </Container>

          <PrimaryButton>Save</PrimaryButton>
        </FlexBox>
      </FlexBox>
    </AnnualPlanLayout>
  );
};

export default PresentLevels;
