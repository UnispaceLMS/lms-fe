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

const ContactInformation = () => {
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [contactInfo, setContactInfo] = useState({
    email: studentProfile?.email || "",
    phoneNumber: studentProfile?.phoneNumber || "",
    emergencyContactName: studentProfile?.emergencyContactName || "",
    emergencyContactEmail: studentProfile?.emergencyContactEmail || "",
    emergencyContactPhoneNumber:
      studentProfile?.emergencyContactPhoneNumber || "",
  });

  const {
    email,
    phoneNumber,
    emergencyContactName,
    emergencyContactEmail,
    emergencyContactPhoneNumber,
  } = contactInfo || {};

  useEffect(() => {
    if (studentProfile) {
      setContactInfo(prev => ({
        ...prev,
        email: studentProfile?.email || "",
        phoneNumber: studentProfile?.phoneNumber || "",
        emergencyContactName: studentProfile?.emergencyContactName || "",
        emergencyContactEmail: studentProfile?.emergencyContactEmail || "",
        emergencyContactPhoneNumber:
          studentProfile?.emergencyContactPhoneNumber || "",
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
      const id = studentProfile?.id;
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
              <Text color={GRAY_800}>Student Email ID</Text>
              <TextInput
                name="email"
                value={email}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Student Contact Number</Text>
              <TextInput
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>
          </FlexBox>

          <InputContainer>
            <Text color={GRAY_800}>Emergency Contact Name</Text>
            <TextInput
              onChange={handleInput}
              placeholder="Type Here"
              name="emergencyContactName"
              value={emergencyContactName}
            />
          </InputContainer>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Emergency Contact Number</Text>
              <TextInput
                onChange={handleInput}
                placeholder="Type Here"
                name="emergencyContactPhoneNumber"
                value={emergencyContactPhoneNumber}
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Emergency Contact Email</Text>
              <TextInput
                onChange={handleInput}
                placeholder="Type Here"
                name="emergencyContactEmail"
                value={emergencyContactEmail}
              />
            </InputContainer>
          </FlexBox>
        </FlexBox>

        <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
      </FlexBox>
    </Wrapper>
  );
};

export default ContactInformation;
