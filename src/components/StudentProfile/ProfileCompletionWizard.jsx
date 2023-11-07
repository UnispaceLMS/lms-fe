import styled, { css } from "styled-components";
import { IoCheckmarkCircle } from "react-icons/io5";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";

import {
  WHITE,
  GRAY_100,
  GRAY_200,
  GRAY_500,
  PRIMARY_50,
  PRIMARY_600,
  SUCCESS_100,
  SUCCESS_500,
  SUCCESS_600,
} from "@constants/colors";
import { profileSetupSteps } from "@metadata/profile";

const Wrapper = styled(FlexBox)`
  width: 100%;
  border-radius: 0.5rem;
  justify-content: center;
  padding: 2.5rem 2.5rem 2rem;
  border: 1px solid ${GRAY_200};
`;

const Container = styled(FlexBox)`
  flex: 1;
  max-width: 13.5%;
  row-gap: 0.875rem;
  flex-direction: column;
  align-items: flex-start;
`;

const Relative = styled(FlexBox)`
  width: 100%;
  position: relative;
  align-items: center;
`;

const Circle = styled(FlexBox)`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_500};

  ${({ ongoing }) =>
    ongoing &&
    css`
      border-color: ${PRIMARY_600};
    `}

  ${({ completed }) =>
    completed &&
    css`
      border-color: ${SUCCESS_500};
    `}
`;

const InnerContainer = styled(FlexBox)`
  left: 1rem;
  width: 93%;
  position: absolute;
  align-items: center;
  transform: translateX(-2.5px);

  svg {
    z-index: 10;
  }

  ${({ completed }) =>
    completed &&
    css`
      width: 95%;
      left: 0.75rem;
    `}
`;

const Dot = styled(FlexBox)`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${GRAY_500};

  ${({ ongoing }) =>
    ongoing &&
    css`
      background-color: ${PRIMARY_600};
    `}
`;

const Line = styled(FlexBox)`
  height: 2px;
  width: 100%;
  left: -2.5px;
  position: relative;
  border-radius: 0.25rem;
  background-color: ${GRAY_500};

  ${({ ongoing }) =>
    ongoing &&
    css`
      background-color: ${PRIMARY_600};
    `}

  ${({ completed }) =>
    completed &&
    css`
      background-color: ${SUCCESS_500};
    `}
`;

const LabelChip = styled(FlexBox)`
  border-radius: 1rem;
  padding: 0.25rem 0.5rem;
  background-color: ${GRAY_100};

  ${Text} {
    color: ${GRAY_500};
  }

  ${({ ongoing }) =>
    ongoing &&
    css`
      background-color: ${PRIMARY_50};

      ${Text} {
        color: ${PRIMARY_600};
      }
    `}

  ${({ completed }) =>
    completed &&
    css`
      background-color: ${SUCCESS_100};

      ${Text} {
        color: ${SUCCESS_600};
      }
    `}
`;

const LastStep = styled(FlexBox)`
  row-gap: 0.875rem;
  flex-direction: column;
  background-color: ${WHITE};
`;

const RenderDotAndLine = ({ ongoing, completed }) => (
  <InnerContainer completed={completed}>
    {completed ? (
      <IoCheckmarkCircle size="1rem" color={SUCCESS_500} />
    ) : (
      <Dot ongoing={ongoing} />
    )}

    <Line ongoing={ongoing} completed={completed} />
  </InnerContainer>
);

const RenderCompletionStep = ({ label, ongoing, completed }) => {
  return (
    <Container>
      <Relative>
        <Circle ongoing={ongoing} completed={completed} />
        <RenderDotAndLine completed={completed} ongoing={ongoing} />
      </Relative>

      <LabelChip ongoing={ongoing} completed={completed}>
        <Text size="0.625rem">{label}</Text>
      </LabelChip>
    </Container>
  );
};

// current step provides the step number we are at
// provided by every component that uses the Wizard
const ProfileCompletionWizard = ({ currentStep }) => {
  return (
    <Wrapper>
      {profileSetupSteps?.map((step, i) => {
        const stepValue = i + 1; // adding 1 to 0-indexing
        const ongoing = stepValue === currentStep;
        const completed = stepValue < currentStep;
        const isLastStep = i === profileSetupSteps?.length - 1;

        const commonProps = { ongoing, completed };

        if (isLastStep) {
          return (
            <FlexBox column rowGap="0.875rem" key={step}>
              <Circle {...commonProps}>
                <Dot {...commonProps} />
              </Circle>

              <LabelChip>
                <Text size="0.625rem" {...commonProps}>
                  {step}
                </Text>
              </LabelChip>
            </FlexBox>
          );
        }

        return (
          <RenderCompletionStep key={step} label={step} {...commonProps} />
        );
      })}
    </Wrapper>
  );
};

export default ProfileCompletionWizard;
