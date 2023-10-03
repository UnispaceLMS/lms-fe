import styled, { css } from "styled-components";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";

import {
  GRAY_100,
  GRAY_200,
  GRAY_600,
  PRIMARY_500,
  WHITE,
} from "@constants/colors";

const Wrapper = styled(FlexBox)`
  height: 100%;
  row-gap: 0.25rem;
  padding: 4rem 0.5rem;
  flex-direction: column;
  background-color: ${GRAY_100};
  border: 1px solid ${GRAY_200};
`;

const Option = styled(FlexBox)`
  width: 100%;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${PRIMARY_500};

      ${Text} {
        color: ${WHITE};
      }
    `}
`;

const SecondarySidebar = () => {
  return (
    <Wrapper>
      <Option selected>
        <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
          Overview
        </Text>
      </Option>
      <Option>
        <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
          Health & wellness
        </Text>
      </Option>
      <Option>
        <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
          Personal Management
        </Text>
      </Option>
      <Option>
        <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
          Home Management
        </Text>
      </Option>
      <Option>
        <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
          Safety
        </Text>
      </Option>
      <Option>
        <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
          Transportation
        </Text>
      </Option>
      <Option>
        <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
          Healthy Relationship
        </Text>
      </Option>
      <Option>
        <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
          Money Management
        </Text>
      </Option>
      <Option>
        <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
          Employment
        </Text>
      </Option>
      <Option>
        <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
          Misc
        </Text>
      </Option>
    </Wrapper>
  );
};

export default SecondarySidebar;
