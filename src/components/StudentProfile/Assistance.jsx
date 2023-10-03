import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import { PrimaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import InputContainer from "./InputContainer";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { GRAY_800 } from "@constants/colors";

const Assistance = () => {
  const onSave = () => {};

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={6} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Personal Information
        </Text>

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Morning Assistance</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Afternoon Assistance</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Evening Assistance</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>
          </FlexBox>

          <InputContainer>
            <Text color={GRAY_800}>Accommodations</Text>
            <TextInput placeholder="Type Here" />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Independent Capabilities</Text>
            <TextInput placeholder="Type Here" />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Help Required in (Areas)</Text>
            <TextInput placeholder="Type Here" />
          </InputContainer>
        </FlexBox>

        <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
      </FlexBox>
    </Wrapper>
  );
};

export default Assistance;
