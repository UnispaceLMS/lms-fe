import { useState } from "react";
import styled, { css } from "styled-components";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import { PrimaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import InputContainer from "./InputContainer";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { GRAY_100, GRAY_800 } from "@constants/colors";

const SupportGrid = styled.div`
  width: 100%;
  display: grid;
  row-gap: 0.75rem;
  grid-template-columns: 1fr 1fr 0.42fr;
`;

const GridEntry = styled(FlexBox)`
  width: 100%;
  padding: 0.875rem;

  input {
    width: 100%;
    border: none;
    font-size: 0.75rem;
  }

  ${({ header }) =>
    header &&
    css`
      background-color: ${GRAY_100};
    `}
`;

const GridHeader = () => (
  <>
    <GridEntry header>
      <Text bold size="0.75rem">
        Support & Modification to the Environment
      </Text>
    </GridEntry>
    <GridEntry header>
      <Text bold size="0.75rem">
        Condition
      </Text>
    </GridEntry>
    <GridEntry header>
      <Text bold size="0.75rem">
        Location
      </Text>
    </GridEntry>
  </>
);

const GridRow = ({ id, label, condition, location, handleChange }) => (
  <>
    <GridEntry>
      <Text size="0.75rem">{label}</Text>
    </GridEntry>
    <GridEntry>
      <input
        id={id}
        name="condition"
        value={condition}
        onChange={handleChange}
        placeholder="Type Here"
      />
    </GridEntry>
    <GridEntry>
      <input
        id={id}
        name="location"
        value={location}
        onChange={handleChange}
        placeholder="Type Here"
      />
    </GridEntry>
  </>
);

const AssistanceSupport = () => {
  const [supportData, setSupportData] = useState({
    fidget: {
      location: "",
      condition: "",
    },
    breaks: {
      location: "",
      condition: "",
    },
    reminder: {
      location: "",
      condition: "",
    },
    mentalHealth: {
      location: "",
      condition: "",
    },
    positiveReinforcement: {
      location: "",
      condition: "",
    },
  });
  const [assistanceData, setAssistanceData] = useState({
    morning: "",
    evening: "",
    afternoon: "",
    capabilities: "",
    helpRequired: "",
    accommodations: "",
  });

  const {
    morning,
    evening,
    afternoon,
    capabilities,
    helpRequired,
    accommodations,
  } = assistanceData;
  const { breaks, fidget, reminder, mentalHealth, positiveReinforcement } =
    supportData;

  const handleSupportInput = e => {
    try {
      const { id, name, value } = e.target;

      setSupportData(prev => ({
        ...prev,
        [id]: {
          [name]: value,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssistanceInput = e => {
    try {
      const { name, value } = e.target;

      setAssistanceData(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {};

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={6} />

      <FlexBox column rowGap="7rem" margin="0 0 0 2.25rem">
        <FlexBox column rowGap="3rem">
          <Text bold size="1.25rem">
            Assistance
          </Text>

          <FlexBox column rowGap="1.5rem" align="flex-start">
            <FlexBox colGap="2rem">
              <InputContainer>
                <Text color={GRAY_800}>Morning Assistance</Text>
                <TextInput
                  name="morning"
                  value={morning}
                  placeholder="Type Here"
                  onChange={handleAssistanceInput}
                />
              </InputContainer>

              <InputContainer>
                <Text color={GRAY_800}>Afternoon Assistance</Text>
                <TextInput
                  name="afternoon"
                  value={afternoon}
                  placeholder="Type Here"
                  onChange={handleAssistanceInput}
                />
              </InputContainer>

              <InputContainer>
                <Text color={GRAY_800}>Evening Assistance</Text>
                <TextInput
                  name="evening"
                  value={evening}
                  placeholder="Type Here"
                  onChange={handleAssistanceInput}
                />
              </InputContainer>
            </FlexBox>

            <InputContainer>
              <Text color={GRAY_800}>Accommodations</Text>
              <TextInput
                name="accommodations"
                value={accommodations}
                placeholder="Type Here"
                onChange={handleAssistanceInput}
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Independent Capabilities</Text>
              <TextInput
                name="capabilities"
                value={capabilities}
                placeholder="Type Here"
                onChange={handleAssistanceInput}
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Help Required in (Areas)</Text>
              <TextInput
                name="helpRequired"
                value={helpRequired}
                placeholder="Type Here"
                onChange={handleAssistanceInput}
              />
            </InputContainer>
          </FlexBox>
        </FlexBox>

        <FlexBox column rowGap="3rem">
          <Text bold size="1.25rem">
            Support
          </Text>

          <SupportGrid>
            <GridHeader />

            <GridRow
              id="fidget"
              label="Access to Fidget"
              location={fidget?.location}
              condition={fidget?.condition}
              handleChange={handleSupportInput}
            />

            <GridRow
              id="breaks"
              label="Breaks/ Alone Time"
              location={breaks?.location}
              condition={breaks?.condition}
              handleChange={handleSupportInput}
            />

            <GridRow
              id="mentalHealth"
              label="Mental Health Check Ins"
              location={mentalHealth?.location}
              handleChange={handleSupportInput}
              condition={mentalHealth?.condition}
            />

            <GridRow
              id="reminder"
              location={reminder?.location}
              condition={reminder?.condition}
              handleChange={handleSupportInput}
              label="Reminder to Fill Medication"
            />

            <GridRow
              id="positiveReinforcement"
              label="Positive Reinforcement"
              handleChange={handleSupportInput}
              location={positiveReinforcement?.location}
              condition={positiveReinforcement?.condition}
            />
          </SupportGrid>

          <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default AssistanceSupport;
