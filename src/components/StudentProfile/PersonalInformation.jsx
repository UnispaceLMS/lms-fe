import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Select from "react-select";
import dynamic from "next/dynamic";
import utc from "dayjs/plugin/utc";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Text from "@common/Text";
import Loader from "@common/Loader";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import { PrimaryButton, SecondaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import InputContainer from "./InputContainer";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { studentPrograms } from "@/metadata/programs";
import { GRAY_300, GRAY_800 } from "@constants/colors";
import { saveUpdateProfile } from "@/redux/Slices/studentSlice";

const DatePicker = dynamic(() => import("@common/DatePicker"), { ssr: false });

dayjs.extend(utc);

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
    columnGap: "0.5rem",
    borderColor: GRAY_300,
    borderRadius: "0.5rem",
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
  dropdownIndicator: baseStyles => ({ ...baseStyles, padding: 0 }),
};

const PersonalInformation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const today = dayjs().toDate();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [personalInfo, setPersonalInfo] = useState({
    lastName: studentProfile?.lastName || "",
    firstName: studentProfile?.firstName || "",
    middleName: studentProfile?.middleName || "",
    dateOfBirth: studentProfile?.dateOfBirth || null,
    program: studentPrograms?.find(
      ({ value }) => value === studentProfile?.program
    ),
    legalGuardianName: studentProfile?.legalGuardianName || "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);

  const {
    program,
    lastName,
    firstName,
    middleName,
    dateOfBirth,
    legalGuardianName,
  } = personalInfo || {};

  const saveDisabled =
    !firstName || !lastName || !dateOfBirth || !legalGuardianName || !program;

  useEffect(() => {
    if (studentProfile) {
      setPersonalInfo(prev => ({
        ...prev,
        lastName: studentProfile?.lastName || "",
        firstName: studentProfile?.firstName || "",
        middleName: studentProfile?.middleName || "",
        dateOfBirth: studentProfile?.dateOfBirth || null,
        program: studentPrograms?.find(
          ({ value }) => value === studentProfile?.program
        ),
        legalGuardianName: studentProfile?.legalGuardianName || "",
      }));
    }
  }, [studentProfile]);

  const toggleDatePicker = () => setShowDatePicker(prev => !prev);

  const handleInput = e => {
    try {
      const { name, value } = e.target;

      setPersonalInfo(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const setDate = date =>
    setPersonalInfo(prev => ({ ...prev, dateOfBirth: date }));

  const selectProgram = program => {
    try {
      setPersonalInfo(prev => ({ ...prev, program }));
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {
    try {
      setRequestLoading(true);
      const id = router?.query?.id;
      const payload = { id };

      Object.keys(personalInfo)
        ?.filter(key => !!personalInfo?.[key])
        ?.forEach(key => {
          payload[key] = personalInfo?.[key];
        });

      if (payload?.program) {
        payload.program = payload?.program?.value;
      }
      if (payload?.dateOfBirth) {
        payload.dateOfBirth = dayjs(payload?.dateOfBirth)?.utc()?.format();
      }

      dispatch(
        saveUpdateProfile({
          data: payload,
          nextLink: `/student/${id}/profile/contact-information`,
        })
      );
    } catch (error) {
      setRequestLoading(false);
      console.log(error, "Error in saving profile");
    }
  };

  const handleBack = () => router?.back();

  if (requestLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={1} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Personal Information
        </Text>

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <InputContainer>
            <Text color={GRAY_800}>Student First Name*</Text>
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
            <Text color={GRAY_800}>Student Last Name*</Text>
            <TextInput
              name="lastName"
              value={lastName}
              onChange={handleInput}
              placeholder="Type Here"
            />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Date of Birth*</Text>
            <DatePicker
              max={today}
              setDate={setDate}
              date={dateOfBirth}
              open={showDatePicker}
              toggleCalendar={toggleDatePicker}
            />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Legal Guardian&apos;s Full Name*</Text>
            <TextInput
              onChange={handleInput}
              placeholder="Type Here"
              name="legalGuardianName"
              value={legalGuardianName}
            />
          </InputContainer>

          <InputContainer>
            <Text color={GRAY_800}>Program*</Text>
            <Select
              value={program}
              onChange={selectProgram}
              options={studentPrograms}
              styles={customSelectStyles}
            />
          </InputContainer>
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

export default PersonalInformation;
