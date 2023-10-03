import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import { PrimaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import InputContainer from "./InputContainer";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { GRAY_800 } from "@constants/colors";

const MentalHealth = () => {
  const onSave = () => {};

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={4} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Personal Information
        </Text>

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Diagnosis</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Student Perspective</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>
          </FlexBox>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Triggers</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Toughest Time</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>
          </FlexBox>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Coping Mechanism : Objects</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Coping Mechanism : Activities</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Coping Mechanism : People</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>
          </FlexBox>

          <InputContainer>
            <Text color={GRAY_800}>Calming Strategy</Text>
            <TextInput placeholder="Type Here" />
          </InputContainer>
        </FlexBox>

        <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
      </FlexBox>
    </Wrapper>
  );
};

export default MentalHealth;
