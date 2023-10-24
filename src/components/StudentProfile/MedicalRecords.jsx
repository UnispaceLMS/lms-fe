import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import { PrimaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import InputContainer from "./InputContainer";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { GRAY_800 } from "@constants/colors";

const MedicalRecords = () => {
  const studentProfile = useSelector(state => state?.student?.profile);

  // TODO student profile allergies -> array
  const [medicalRecords, setMedicalRecords] = useState({
    allergies: "",
    bloodGroup: studentProfile?.bloodGroup || "",
    medicineRoutine: studentProfile?.medicineRoutine || "",
    primaryDiagnosis: studentProfile?.primaryDiagnosis || "",
    allergicReactions: studentProfile?.allergicReactions || "",
  });

  const {
    allergies,
    bloodGroup,
    medicineRoutine,
    primaryDiagnosis,
    allergicReactions,
  } = medicalRecords;

  useEffect(() => {
    if (studentProfile) {
      setMedicalRecords(prev => ({
        ...prev,
        // allergies: studentProfile?.allergies || "",
        bloodGroup: studentProfile?.bloodGroup || "",
        medicineRoutine: studentProfile?.medicineRoutine || "",
        primaryDiagnosis: studentProfile?.primaryDiagnosis || "",
        allergicReactions: studentProfile?.allergicReactions || "",
      }));
    }
  }, [studentProfile]);

  const handleInput = e => {
    try {
      const { name, value } = e.target;

      setMedicalRecords(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {};

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={3} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Personal Information
        </Text>

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <InputContainer>
            <Text color={GRAY_800}>Primary Diagnosis</Text>
            <TextInput
              onChange={handleInput}
              placeholder="Type Here"
              name="primaryDiagnosis"
              value={primaryDiagnosis}
            />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Blood Group</Text>
            <TextInput
              name="bloodGroup"
              value={bloodGroup}
              onChange={handleInput}
              placeholder="Type Here"
            />
          </InputContainer>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Allergies</Text>
              <TextInput
                name="allergies"
                value={allergies}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Allergic Reactions</Text>
              <TextInput
                onChange={handleInput}
                placeholder="Type Here"
                name="allergicReactions"
                value={allergicReactions}
              />
            </InputContainer>
          </FlexBox>

          <InputContainer>
            <Text color={GRAY_800}>Medicine Routine</Text>
            <TextInput
              onChange={handleInput}
              name="medicineRoutine"
              value={medicineRoutine}
              placeholder="Type Here"
            />
          </InputContainer>
        </FlexBox>

        <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
      </FlexBox>
    </Wrapper>
  );
};

export default MedicalRecords;
