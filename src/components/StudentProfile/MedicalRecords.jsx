import { useEffect, useState } from "react";
import Select from "react-select";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import MultipleEntryTable from "@common/MultipleEntryTable";
import { PrimaryButton, SecondaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import InputContainer from "./InputContainer";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { bloodGroups } from "@metadata/bloodGroups";
import { saveUpdateProfile } from "@redux/Slices/studentSlice";
import { GRAY_200, GRAY_300, GRAY_800 } from "@constants/colors";

const defaultAllergyEntry = Object.freeze({ allergy: "", reaction: "" });

const customSelectStyles = {
  container: baseStyles => ({
    ...baseStyles,
    width: "100%",
  }),
  control: baseStyles => ({
    ...baseStyles,
    padding: "1rem",
    fontSize: "1rem",
    boxShadow: "none",
    minHeight: "unset",
    borderColor: GRAY_200,
    "&:hover": {
      borderColor: GRAY_200,
    },
  }),
  valueContainer: baseStyles => ({
    ...baseStyles,
    padding: 0,
  }),
  input: baseStyles => ({
    ...baseStyles,
    margin: 0,
    padding: 0,
  }),
  indicatorSeparator: () => ({ display: "none" }),
  placeholder: baseStyles => ({ ...baseStyles, color: GRAY_300 }),
  dropdownIndicator: baseStyles => ({ ...baseStyles, padding: 0 }),
};

const MedicalRecords = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [allergyInfo, setAllergyInfo] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState({
    bloodGroup: null,
    medicineRoutine: studentProfile?.medicineRoutine || "",
    primaryDiagnosis: studentProfile?.primaryDiagnosis || "",
  });

  const { bloodGroup, medicineRoutine, primaryDiagnosis } = medicalRecords;

  useEffect(() => {
    if (studentProfile) {
      let bloodGroup = null;
      let allergies = [{ allergy: "", reaction: "" }];

      if (studentProfile?.bloodGroup) {
        bloodGroup = bloodGroups?.find(
          ({ value }) => studentProfile?.bloodGroup === value
        );
      }

      if (!!studentProfile?.allergies?.length) {
        allergies = studentProfile?.allergies;
      }

      setAllergyInfo(allergies);
      setMedicalRecords(prev => ({
        ...prev,
        bloodGroup,
        medicineRoutine: studentProfile?.medicineRoutine || "",
        primaryDiagnosis: studentProfile?.primaryDiagnosis || "",
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

  const onSave = () => {
    try {
      const id = router?.query?.id;
      const payload = { id };

      let allergies = allergyInfo?.filter(
        ({ allergy, reaction }) => !!allergy && !!reaction
      );

      Object.keys(medicalRecords)
        ?.filter(key => !!medicalRecords?.[key])
        ?.forEach(key => {
          payload[key] = medicalRecords?.[key];
        });

      if (!!allergies?.length) payload.allergies = allergies;

      dispatch(
        saveUpdateProfile({
          data: payload,
          nextLink: `/student/${id}/profile/mental-health`,
        })
      );
    } catch (error) {
      console.log(error, "Error in saving profile");
    }
  };

  const handleBack = () => router?.back();

  const addAllergyEntry = () => {
    try {
      const entries = [...allergyInfo, { ...defaultAllergyEntry }];

      setAllergyInfo(entries);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAllergyInput = (e, i) => {
    try {
      const { name, value } = e.target;

      const entries = [...allergyInfo];
      let entry = entries?.[i];

      entry = { ...entry, [name]: value };
      entries[i] = entry;

      setAllergyInfo(entries);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={3} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Medical Records
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
            <Select
              value={bloodGroup}
              options={bloodGroups}
              placeholder="Blood Group"
              styles={customSelectStyles}
              onChange={option =>
                setMedicalRecords(prev => ({ ...prev, bloodGroup: option }))
              }
            />
          </InputContainer>

          <MultipleEntryTable
            entries={allergyInfo}
            addEntry={addAllergyEntry}
            handleChange={handleAllergyInput}
            columns={["Allergies", "Allergies Reaction"]}
          />

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

        <FlexBox align="center" colGap="1.5rem">
          <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
          <SecondaryButton onClick={handleBack}>Back</SecondaryButton>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default MedicalRecords;
