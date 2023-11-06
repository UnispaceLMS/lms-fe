import { useEffect, useState } from "react";
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

const PersonalLife = () => {
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [personalLifeInfo, setPersonalLifeInfo] = useState({
    fears: studentProfile?.fears || [],
    family: studentProfile?.family || [],
    friends: studentProfile?.friends || [],
    worries: studentProfile?.worries || [],
    dreamJob: studentProfile?.dreamJob || "",
    interests: studentProfile?.interests || [],
    safetyStruggle: studentProfile?.safetyStruggle || "",
    dreamLivingSituation: studentProfile?.dreamLivingSituation || "",
  });

  const {
    fears,
    family,
    friends,
    worries,
    dreamJob,
    interests,
    safetyStruggle,
    dreamLivingSituation,
  } = personalLifeInfo;

  useEffect(() => {
    if (studentProfile)
      setPersonalLifeInfo(prev => ({
        ...prev,
        fears: studentProfile?.fears || [],
        family: studentProfile?.family || [],
        friends: studentProfile?.friends || [],
        worries: studentProfile?.worries || [],
        dreamJob: studentProfile?.dreamJob || "",
        interests: studentProfile?.interests || [],
        safetyStruggle: studentProfile?.safetyStruggle || "",
        dreamLivingSituation: studentProfile?.dreamLivingSituation || "",
      }));
  }, [studentProfile]);

  const handleInput = e => {
    try {
      const { name, value } = e.target;

      setPersonalLifeInfo(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {
    try {
      const id = studentProfile?.id;
      const payload = { id };

      Object.keys(personalLifeInfo)
        ?.filter(key => !!personalLifeInfo?.[key])
        ?.forEach(key => {
          payload[key] = personalLifeInfo?.[key];
        });

      dispatch(
        saveUpdateProfile({
          data: payload,
          nextLink: `/student/${id}/profile/assistance-support`,
        })
      );
    } catch (error) {
      console.log(error, "Error in saving profile");
    }
  };

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={5} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Personal Life
        </Text>

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <InputContainer>
            <Text color={GRAY_800}>Interests</Text>
            <TextInput
              name="interests"
              value={interests}
              onChange={handleInput}
              placeholder="Type Here"
            />
          </InputContainer>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Family</Text>
              <TextInput
                name="family"
                value={family}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Friends</Text>
              <TextInput
                name="friends"
                value={friends}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>
          </FlexBox>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Dream Job</Text>
              <TextInput
                name="dreamJob"
                value={dreamJob}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Dream Living Situation</Text>
              <TextInput
                onChange={handleInput}
                placeholder="Type Here"
                name="dreamLivingSituation"
                value={dreamLivingSituation}
              />
            </InputContainer>
          </FlexBox>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Primary Worries</Text>
              <TextInput
                name="worries"
                value={worries}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Fears</Text>
              <TextInput
                name="fears"
                value={fears}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Safety Struggle</Text>
              <TextInput
                name="safetyStruggle"
                value={safetyStruggle}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>
          </FlexBox>
        </FlexBox>

        <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
      </FlexBox>
    </Wrapper>
  );
};

export default PersonalLife;
