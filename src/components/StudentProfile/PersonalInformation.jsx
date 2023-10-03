import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import { PrimaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import InputContainer from "./InputContainer";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { GRAY_800 } from "@constants/colors";

const PersonalInformation = () => {
  const onSave = () => {};

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={1} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Personal Information
        </Text>

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <InputContainer>
            <Text color={GRAY_800}>Student Name</Text>
            <TextInput placeholder="Type Here" />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Date of Birth</Text>
            <TextInput placeholder="Type Here" />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Legal Guardian&apos;s Full Name</Text>
            <TextInput placeholder="Type Here" />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Program</Text>
            <TextInput placeholder="Type Here" />
          </InputContainer>
        </FlexBox>

        <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
      </FlexBox>
    </Wrapper>
  );
};

export default PersonalInformation;
