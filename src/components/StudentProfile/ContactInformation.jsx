import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import { PrimaryButton, SecondaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import InputContainer from "./InputContainer";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { GRAY_800 } from "@constants/colors";
import { saveUpdateProfile } from "@/redux/Slices/studentSlice";

const ContactInformation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [contactInfo, setContactInfo] = useState({
    email: studentProfile?.email || "",
    phoneNumber: studentProfile?.phoneNumber || "",
    emergencyContactPhoneNumber:
      studentProfile?.emergencyContactPhoneNumber || "",
    emergencyContactSecondaryPhoneNumber:
      studentProfile?.emergencyContactSecondaryPhoneNumber || "",
    emergencyContactName: studentProfile?.emergencyContactName || "",
    emergencyContactEmail: studentProfile?.emergencyContactEmail || "",
  });

  const {
    email,
    phoneNumber,
    emergencyContactName,
    emergencyContactEmail,
    emergencyContactPhoneNumber,
    emergencyContactSecondaryPhoneNumber,
  } = contactInfo || {};

  const saveDisabled =
    !email ||
    !phoneNumber ||
    !emergencyContactName ||
    !emergencyContactEmail ||
    !emergencyContactPhoneNumber;

  useEffect(() => {
    if (studentProfile) {
      setContactInfo(prev => ({
        ...prev,
        email: studentProfile?.email || "",
        phoneNumber: studentProfile?.phoneNumber || "",
        emergencyContactPhoneNumber:
          studentProfile?.emergencyContactPhoneNumber || "",
        emergencyContactSecondaryPhoneNumber:
          studentProfile?.emergencyContactSecondaryPhoneNumber || "",
        emergencyContactName: studentProfile?.emergencyContactName || "",
        emergencyContactEmail: studentProfile?.emergencyContactEmail || "",
      }));
    }
  }, [studentProfile]);

  const handleInput = e => {
    try {
      const { name, value } = e.target;

      setContactInfo(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {
    try {
      const id = router?.query?.id;
      const payload = { id };

      Object.keys(contactInfo)
        ?.filter(key => !!contactInfo?.[key])
        ?.forEach(key => {
          payload[key] = contactInfo?.[key];
        });

      dispatch(
        saveUpdateProfile({
          data: payload,
          nextLink: `/student/${id}/profile/medical-records`,
        })
      );
    } catch (error) {
      console.log(error, "Error in saving profile");
    }
  };

  const handleBack = () => router?.back();

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={2} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Contact Information
        </Text>

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Student Email ID*</Text>
              <TextInput
                name="email"
                value={email}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Student Contact Number*</Text>
              <TextInput
                type="number"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>
          </FlexBox>

          <InputContainer>
            <Text color={GRAY_800}>Emergency Contact Name*</Text>
            <TextInput
              onChange={handleInput}
              placeholder="Type Here"
              name="emergencyContactName"
              value={emergencyContactName}
            />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Emergency Contact Email*</Text>
            <TextInput
              onChange={handleInput}
              placeholder="Type Here"
              name="emergencyContactEmail"
              value={emergencyContactEmail}
            />
          </InputContainer>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Emergency Contact Number*</Text>
              <TextInput
                type="number"
                onChange={handleInput}
                placeholder="Type Here"
                name="emergencyContactPhoneNumber"
                value={emergencyContactPhoneNumber}
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Emergency Contact Number</Text>
              <TextInput
                type="number"
                onChange={handleInput}
                placeholder="Type Here"
                name="emergencyContactSecondaryPhoneNumber"
                value={emergencyContactSecondaryPhoneNumber}
              />
            </InputContainer>
          </FlexBox>
        </FlexBox>

        <FlexBox align="center" colGap="1.5rem">
          <PrimaryButton onClick={onSave} disabled={saveDisabled}>
            Save & Next
          </PrimaryButton>
          <SecondaryButton onClick={handleBack}>Back</SecondaryButton>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default ContactInformation;
