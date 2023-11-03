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

const PersonalInformation = () => {
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [personalInfo, setPersonalInfo] = useState({
    dob: studentProfile?.dateOfBirth || "",
    program: studentProfile?.program || "",
    lastName: studentProfile?.lastName || "",
    firstName: studentProfile?.firstName || "",
    middleName: studentProfile?.middleName || "",
    guardianName: "",
  });

  const { dob, firstName, lastName, middleName, program, guardianName } =
    personalInfo || {};

  useEffect(() => {
    if (studentProfile) {
      setPersonalInfo(prev => ({
        ...prev,
        dob: studentProfile?.dateOfBirth || "",
        program: studentProfile?.program || "",
        lastName: studentProfile?.lastName || "",
        firstName: studentProfile?.firstName || "",
        middleName: studentProfile?.middleName || "",
        guardianName: "",
      }));
    }
  }, [studentProfile]);

  const handleInput = e => {
    try {
      const { name, value } = e.target;

      setPersonalInfo(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {
    try {
      const id = studentProfile?.id;
      const payload = { id };

      Object.keys(personalInfo)
        ?.filter(key => !!personalInfo?.[key])
        ?.forEach(key => {
          payload[key] = personalInfo?.[key];
        });

      dispatch(
        saveUpdateProfile({
          data: payload,
          nextLink: `/student/${id}/profile/contact-information`,
        })
      );
    } catch (error) {
      console.log(error, "Error in saving profile");
    }
  };

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={1} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Personal Information
        </Text>

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <InputContainer>
            <Text color={GRAY_800}>Student First Name</Text>
            <TextInput
              name="firstName"
              value={firstName}
              onChange={handleInput}
              placeholder="Type Here"
            />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Student Middle Name</Text>
            <TextInput
              name="middleName"
              value={middleName}
              onChange={handleInput}
              placeholder="Type Here"
            />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Student Last Name</Text>
            <TextInput
              name="lastName"
              value={lastName}
              onChange={handleInput}
              placeholder="Type Here"
            />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Date of Birth</Text>
            <TextInput
              name="dob"
              value={dob}
              onChange={handleInput}
              placeholder="Type Here"
            />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Legal Guardian&apos;s Full Name</Text>
            <TextInput
              name="guardianName"
              value={guardianName}
              onChange={handleInput}
              placeholder="Type Here"
            />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Program</Text>
            <TextInput
              name="program"
              value={program}
              onChange={handleInput}
              placeholder="Type Here"
            />
          </InputContainer>
        </FlexBox>

        <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
      </FlexBox>
    </Wrapper>
  );
};

export default PersonalInformation;
