import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import { PrimaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import InputContainer from "./InputContainer";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { GRAY_800 } from "@constants/colors";

const PersonalLife = () => {
  const onSave = () => {};

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={5} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Personal Information
        </Text>

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <InputContainer>
            <Text color={GRAY_800}>Interests</Text>
            <TextInput placeholder="Type Here" />
          </InputContainer>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Family</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Friends</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>
          </FlexBox>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Dream Job</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Dream Living Situation</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>
          </FlexBox>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Primary Worries</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Fears</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Safety Struggle</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>
          </FlexBox>
        </FlexBox>

        <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
      </FlexBox>
    </Wrapper>
  );
};

export default PersonalLife;
