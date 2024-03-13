import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Text from "@common/Text";
import Loader from "@common/Loader";
import FlexBox from "@common/FlexBox";
import { PrimaryButton, SecondaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { GRAY_300 } from "@/constants/colors";
import { saveUpdateProfile } from "@redux/Slices/studentSlice";
import { concernEnums, strengthEnums } from "@metadata/strengthsConcerns";

const TextArea = styled.textarea`
  width: 80%;
  resize: none;
  height: 7rem;
  overflow: auto;
  padding: 0.75rem;
  border-radius: 0.25rem;
  border: 1px solid ${GRAY_300};
`;

const defaultEntries = Object.freeze({
  concerns: { note: "" },
  strengths: { note: "" },
});

const StrengthsConcerns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [requestLoading, setRequestLoading] = useState(false);
  const [familyIdentified, setFamilyIdentified] = useState({
    concerns: [{ note: "" }],
    strengths: [{ note: "" }],
  });
  const [studentIdentified, setStudentIdentified] = useState({
    concerns: [{ note: "" }],
    strengths: [{ note: "" }],
  });
  const [teacherIdentified, setTeacherIdentified] = useState({
    concerns: [{ note: "" }],
    strengths: [{ note: "" }],
  });

  useEffect(() => {
    if (studentProfile) {
      let familyIdentified = {
        concerns: [{ ...defaultEntries.concerns }],
        strengths: [{ ...defaultEntries.strengths }],
      };
      let studentIdentified = {
        concerns: [{ ...defaultEntries.concerns }],
        strengths: [{ ...defaultEntries.strengths }],
      };
      let teacherIdentified = {
        concerns: [{ ...defaultEntries.concerns }],
        strengths: [{ ...defaultEntries.strengths }],
      };

      if (!!studentProfile?.strengths?.length) {
        const familyStrengths = studentProfile?.strengths
          ?.filter(({ type }) => type === strengthEnums.family)
          ?.map(({ note }) => ({ note }));

        const studentStrengths = studentProfile?.strengths
          ?.filter(({ type }) => type === strengthEnums.student)
          ?.map(({ note }) => ({ note }));

        const teacherStrengths = studentProfile?.strengths
          ?.filter(({ type }) => type === strengthEnums.teacher)
          ?.map(({ note }) => ({ note }));

        if (!!familyStrengths?.length) {
          familyIdentified.strengths = familyStrengths;
        }
        if (!!studentStrengths?.length) {
          studentIdentified.strengths = studentStrengths;
        }
        if (!!teacherStrengths?.length) {
          teacherIdentified.strengths = teacherStrengths;
        }
      }

      if (!!studentProfile?.concerns?.length) {
        const familyConcerns = studentProfile?.concerns
          ?.filter(({ type }) => type === concernEnums.family)
          ?.map(({ note }) => ({ note }));

        const studentConcerns = studentProfile?.concerns
          ?.filter(({ type }) => type === concernEnums.student)
          ?.map(({ note }) => ({ note }));

        const teacherConcerns = studentProfile?.concerns
          ?.filter(({ type }) => type === concernEnums.teacher)
          ?.map(({ note }) => ({ note }));

        if (!!familyConcerns?.length) {
          familyIdentified.concerns = familyConcerns;
        }
        if (!!studentConcerns?.length) {
          studentIdentified.concerns = studentConcerns;
        }
        if (!!teacherConcerns?.length) {
          teacherIdentified.concerns = teacherConcerns;
        }
      }

      setStudentIdentified(prev => ({
        ...prev,
        concerns: studentIdentified?.concerns,
        strengths: studentIdentified?.strengths,
      }));
      setFamilyIdentified(prev => ({
        ...prev,
        concerns: familyIdentified?.concerns,
        strengths: familyIdentified?.strengths,
      }));
      setTeacherIdentified(prev => ({
        ...prev,
        concerns: teacherIdentified?.concerns,
        strengths: teacherIdentified?.strengths,
      }));
    }
  }, [studentProfile]);

  const onSave = () => {
    try {
      setRequestLoading(true);
      const id = router?.query?.id;
      const payload = { id };

      let concerns = [];
      let strengths = [];

      const familyIdentifiedConcerns = familyIdentified?.concerns
        ?.filter(({ note }) => !!note)
        ?.map(({ note }) => ({ note, type: concernEnums.family }));
      const studentIdentifiedConcerns = studentIdentified?.concerns
        ?.filter(({ note }) => !!note)
        ?.map(({ note }) => ({ note, type: concernEnums.student }));
      const teacherIdentifiedConcerns = teacherIdentified?.concerns
        ?.filter(({ note }) => !!note)
        ?.map(({ note }) => ({ note, type: concernEnums.teacher }));

      const familyIdentifiedStrengths = familyIdentified?.strengths
        ?.filter(({ note }) => !!note)
        ?.map(({ note }) => ({ note, type: strengthEnums.family }));
      const studentIdentifiedStrengths = studentIdentified?.strengths
        ?.filter(({ note }) => !!note)
        ?.map(({ note }) => ({ note, type: strengthEnums.student }));
      const teacherIdentifiedStrengths = teacherIdentified?.strengths
        ?.filter(({ note }) => !!note)
        ?.map(({ note }) => ({ note, type: strengthEnums.teacher }));

      if (!!familyIdentifiedConcerns?.length) {
        concerns = [...concerns, ...familyIdentifiedConcerns];
      }
      if (!!studentIdentifiedConcerns?.length) {
        concerns = [...concerns, ...studentIdentifiedConcerns];
      }
      if (!!teacherIdentifiedConcerns?.length) {
        concerns = [...concerns, ...teacherIdentifiedConcerns];
      }

      if (!!familyIdentifiedStrengths?.length) {
        strengths = [...strengths, ...familyIdentifiedStrengths];
      }
      if (!!studentIdentifiedStrengths?.length) {
        strengths = [...strengths, ...studentIdentifiedStrengths];
      }
      if (!!teacherIdentifiedStrengths?.length) {
        strengths = [...strengths, ...teacherIdentifiedStrengths];
      }

      if (!!concerns?.length) payload.concerns = concerns;
      if (!!strengths?.length) payload.strengths = strengths;

      dispatch(
        saveUpdateProfile({
          data: payload,
          nextLink: `/student/${id}/profile/transition`,
        })
      );
    } catch (error) {
      setRequestLoading(false);
      console.log(error, "Error in saving profile");
    }
  };

  const handleBack = () => router?.back();

  const handleStudentID = e => {
    try {
      const { name, value } = e.target;

      const entriesCopy = [...studentIdentified?.[name]];
      let entry = entriesCopy?.[0];

      entry = { ...entry, note: value };
      entriesCopy[0] = entry;

      setStudentIdentified(prev => ({
        ...prev,
        [name]: entriesCopy,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFamilyID = e => {
    try {
      const { name, value } = e.target;

      const entriesCopy = [...familyIdentified?.[name]];
      let entry = entriesCopy?.[0];

      entry = { ...entry, note: value };
      entriesCopy[0] = entry;

      setFamilyIdentified(prev => ({
        ...prev,
        [name]: entriesCopy,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTeacherID = e => {
    try {
      const { name, value } = e.target;

      const entriesCopy = [...teacherIdentified?.[name]];
      let entry = entriesCopy?.[0];

      entry = { ...entry, note: value };
      entriesCopy[0] = entry;

      setTeacherIdentified(prev => ({
        ...prev,
        [name]: entriesCopy,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  if (requestLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={7} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Strengths & Concerns
        </Text>

        <FlexBox column rowGap="1.5rem">
          <FlexBox column rowGap="1rem">
            <Text weight={500}>Student Identified Strengths</Text>
            <TextArea
              name="strengths"
              onChange={handleStudentID}
              value={studentIdentified?.strengths?.[0]?.note}
            />
          </FlexBox>

          <FlexBox column rowGap="1rem">
            <Text weight={500}>Student Identified Concerns</Text>
            <TextArea
              name="concerns"
              onChange={handleStudentID}
              value={studentIdentified?.concerns?.[0]?.note}
            />
          </FlexBox>

          <FlexBox column rowGap="1rem">
            <Text weight={500}>Family Identified Strengths</Text>
            <TextArea
              name="strengths"
              onChange={handleFamilyID}
              value={familyIdentified?.strengths?.[0]?.note}
            />
          </FlexBox>

          <FlexBox column rowGap="1rem">
            <Text weight={500}>Family Identified Concerns</Text>
            <TextArea
              name="concerns"
              onChange={handleFamilyID}
              value={familyIdentified?.concerns?.[0]?.note}
            />
          </FlexBox>

          <FlexBox column rowGap="1rem">
            <Text weight={500}>Teacher Identified Strengths</Text>
            <TextArea
              name="strengths"
              onChange={handleTeacherID}
              value={teacherIdentified?.strengths?.[0]?.note}
            />
          </FlexBox>

          <FlexBox column rowGap="1rem">
            <Text weight={500}>Teacher Identified Concerns</Text>
            <TextArea
              name="concerns"
              onChange={handleTeacherID}
              value={teacherIdentified?.concerns?.[0]?.note}
            />
          </FlexBox>
        </FlexBox>

        <FlexBox align="center" colGap="1.5rem">
          <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
          <SecondaryButton onClick={handleBack}>Back</SecondaryButton>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default StrengthsConcerns;
