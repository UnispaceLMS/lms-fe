import { FiCheck } from "react-icons/fi";
import styled, { css } from "styled-components";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";

import { WHITE, GRAY_50, SUCCESS_600 } from "@constants/colors";

const Wrapper = styled(FlexBox)`
  cursor: default;
  column-gap: 0.5rem;
  align-items: center;
  padding: 0.625rem 0.875rem;
  justify-content: space-between;

  svg {
    min-width: 1rem;
    color: ${WHITE};
  }

  ${({ isSelected }) =>
    isSelected &&
    css`
      background-color: ${GRAY_50};

      svg {
        color: ${SUCCESS_600};
      }
    `}
`;

const Chip = styled(FlexBox)`
  border-radius: 1rem;
  padding: 0.125rem 0.5rem;
  background-color: ${({ bgColor }) => bgColor};

  ${Text} {
    font-weight: 500;
    font-size: 0.75rem;
    color: ${({ color }) => color};
  }
`;

const Chips = ({
  label,
  value,
  innerRef,
  innerProps,
  isSelected,
  optionStyles,
}) => {
  const optionStyle = optionStyles?.[value];

  return (
    <Wrapper ref={innerRef} isSelected={isSelected} {...innerProps}>
      <Chip color={optionStyle?.color} bgColor={optionStyle?.bgColor}>
        <Text>{label}</Text>
      </Chip>
      <FiCheck />
    </Wrapper>
  );
};

export default Chips;
