import { useDispatch, useSelector } from "react-redux";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import { PrimaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import InputContainer from "./InputContainer";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { GRAY_800 } from "@constants/colors";
import { saveUpdateProfile } from "@/redux/Slices/studentSlice";

const StrengthsConcerns = () => {
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const onSave = () => {
    try {
      const id = studentProfile?.id;
      const payload = { id };

      dispatch(
        saveUpdateProfile({
          data: payload,
          nextLink: `/student/${id}/profile/transition`,
        })
      );
    } catch (error) {
      console.log(error, "Error in saving profile");
    }
  };

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={7} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Strengths & Concerns
        </Text>

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Student Identified Strengths</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Student Identified Concerns</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>
          </FlexBox>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Family Identified Strengths</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Family Identified Concerns</Text>
              <TextInput placeholder="Type Here" />
            </InputContainer>
          </FlexBox>
        </FlexBox>

        <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
      </FlexBox>
    </Wrapper>
  );
};

export default StrengthsConcerns;
