import { FiCheck } from "react-icons/fi";
import styled, { css } from "styled-components";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";

import { AZURE, WHITE, WHITE_SMOKE } from "@constants/colors";

const Wrapper = styled(FlexBox)`
  flex: 1;
  max-width: 100%;
  align-items: center;
  padding: 4rem 0 2rem;
  flex-direction: column;
`;

const Container = styled(FlexBox)`
  width: 95%;
  row-gap: 1.5rem;
  flex-direction: column;
`;

const Actions = styled(FlexBox)`
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const Table = styled.div`
  width: 100%;
  display: grid;
  overflow: hidden;
  row-gap: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid rgba(130, 129, 129, 0.2);
  grid-template-columns: 24.5% 22% 24.5% 17.5% 11.5%;
`;

const TextContainer = styled(FlexBox)`
  width: 100%;
  padding: 0.75rem;
  align-items: center;

  ${({ head }) =>
    head &&
    css`
      background-color: ${WHITE_SMOKE};
    `}
`;

const CheckboxContainer = styled(FlexBox)`
  width: 100%;
  padding: 0.75rem;
  align-items: center;
  justify-content: center;

  ${({ head }) =>
    head &&
    css`
      background-color: ${WHITE_SMOKE};
    `}
`;

const Checkbox = styled(FlexBox)`
  cursor: pointer;
  min-width: 1.25rem;
  min-height: 1.25rem;
  align-items: center;
  border-radius: 0.25rem;
  justify-content: center;
  background-color: #f8f8f9;
  border: 0.8px solid #565454;
  transition: all 250ms ease-in-out;

  svg {
    color: #f8f8f9;
    font-size: 0.75rem;
  }

  ${({ selected }) =>
    selected &&
    css`
      border-color: ${AZURE};
      background-color: ${AZURE};

      svg {
        color: ${WHITE};
      }
    `}
`;

const Roster = () => {
  return (
    <Wrapper>
      <Container>
        <Actions>
          <Text bold>Student Roster</Text>
        </Actions>
        <Table>
          <>
            <CheckboxContainer head>
              <Checkbox>
                <FiCheck />
              </Checkbox>
            </CheckboxContainer>
            <TextContainer head>
              <Text bold size="0.75rem">
                Student Name
              </Text>
            </TextContainer>
            <TextContainer head>
              <Text bold size="0.75rem">
                Program
              </Text>
            </TextContainer>
            <TextContainer head>
              <Text bold size="0.75rem">
                Primary Staff
              </Text>
            </TextContainer>
            <TextContainer head>
              <Text bold size="0.75rem">
                Action
              </Text>
            </TextContainer>
          </>

          <>
            <CheckboxContainer>
              <Checkbox>
                <FiCheck />
              </Checkbox>
            </CheckboxContainer>
            <TextContainer>
              <Text bold size="0.75rem">
                Student Name
              </Text>
            </TextContainer>
            <TextContainer>
              <Text bold size="0.75rem">
                Program
              </Text>
            </TextContainer>
            <TextContainer>
              <Text bold size="0.75rem">
                Primary Staff
              </Text>
            </TextContainer>
            <TextContainer>
              <Text bold size="0.75rem">
                Action
              </Text>
            </TextContainer>
          </>
        </Table>
      </Container>
    </Wrapper>
  );
};

export default Roster;
