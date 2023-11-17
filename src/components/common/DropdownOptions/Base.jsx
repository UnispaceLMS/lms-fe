import { FiCheck } from "react-icons/fi";
import styled, { css } from "styled-components";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";

import {
  WHITE,
  GRAY_50,
  GRAY_500,
  GRAY_700,
  SUCCESS_600,
} from "@constants/colors";

const Wrapper = styled(FlexBox)`
  cursor: default;
  column-gap: 0.5rem;
  align-items: center;
  padding: 0.625rem 0.875rem;
  justify-content: space-between;

  ${Text} {
    color: ${GRAY_500};
  }

  svg {
    min-width: 1rem;
    color: ${WHITE};
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${GRAY_50};

      ${Text} {
        color: ${GRAY_700};
      }

      svg {
        color: ${SUCCESS_600};
      }
    `}
`;

const Base = ({ label, innerRef, innerProps, isSelected }) => {
  return (
    <Wrapper ref={innerRef} isSelected={isSelected} {...innerProps}>
      <Text>{label}</Text>
      <FiCheck />
    </Wrapper>
  );
};

export default Base;
