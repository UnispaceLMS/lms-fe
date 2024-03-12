import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Text from "@common/Text";
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

  const [familyIdentified, setFamilyIdentified] = useState({
    concerns: [{ note: "" }],
    strengths: [{ note: "" }],
  });
  const [studentIdentified, setStudentIdentified] = useState({
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

      if (!!studentProfile?.strengths?.length) {
        const familyStrengths = studentProfile?.strengths
          ?.filter(({ type }) => type === strengthEnums.family)
          ?.map(({ note }) => ({ note }));

        const studentStrengths = studentProfile?.strengths
          ?.filter(({ type }) => type === strengthEnums.student)
          ?.map(({ note }) => ({ note }));

        if (!!familyStrengths?.length) {
          familyIdentified.strengths = familyStrengths;
        }
        if (!!studentStrengths?.length) {
          studentIdentified.strengths = studentStrengths;
        }
      }

      if (!!studentProfile?.concerns?.length) {
        const familyConcerns = studentProfile?.concerns
          ?.filter(({ type }) => type === concernEnums.family)
          ?.map(({ note }) => ({ note }));

        const studentConcerns = studentProfile?.concerns
          ?.filter(({ type }) => type === concernEnums.student)
          ?.map(({ note }) => ({ note }));

        if (!!familyConcerns?.length) {
          familyIdentified.concerns = familyConcerns;
        }
        if (!!studentConcerns?.length) {
          studentIdentified.concerns = studentConcerns;
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
    }
  }, [studentProfile]);

  const onSave = () => {
    try {
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

      const familyIdentifiedStrengths = familyIdentified?.strengths
        ?.filter(({ note }) => !!note)
        ?.map(({ note }) => ({ note, type: strengthEnums.family }));
      const studentIdentifiedStrengths = studentIdentified?.strengths
        ?.filter(({ note }) => !!note)
        ?.map(({ note }) => ({ note, type: strengthEnums.student }));

      if (!!familyIdentifiedConcerns?.length) {
        concerns = [...concerns, ...familyIdentifiedConcerns];
      }
      if (!!studentIdentifiedConcerns?.length) {
        concerns = [...concerns, ...studentIdentifiedConcerns];
      }

      if (!!familyIdentifiedStrengths?.length) {
        strengths = [...strengths, ...familyIdentifiedStrengths];
      }
      if (!!studentIdentifiedStrengths?.length) {
        strengths = [...strengths, ...studentIdentifiedStrengths];
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
      console.log(error, "Error in saving profile");
    }
  };

  const handleBack = () => router?.back();

  const handleStudentIDConcerns = (e, i) => {
    try {
      const { value } = e.target;

      const studentConcernsCopy = [...studentIdentified?.concerns];
      let concern = studentConcernsCopy?.[i];

      concern = { ...concern, note: value };
      studentConcernsCopy[i] = concern;

      setStudentIdentified(prev => ({
        ...prev,
        concerns: studentConcernsCopy,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStudentIDstrengths = (e, i) => {
    try {
      const { value } = e.target;

      const studentStrengthsCopy = [...studentIdentified?.strengths];
      let strength = studentStrengthsCopy?.[i];

      strength = { ...strength, note: value };
      studentStrengthsCopy[i] = strength;

      setStudentIdentified(prev => ({
        ...prev,
        strengths: studentStrengthsCopy,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFamilyIDConcerns = (e, i) => {
    try {
      const { value } = e.target;

      const familyConcernsCopy = [...familyIdentified?.concerns];
      let concern = familyConcernsCopy?.[i];

      concern = { ...concern, note: value };
      familyConcernsCopy[i] = concern;

      setFamilyIdentified(prev => ({
        ...prev,
        concerns: familyConcernsCopy,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFamilyIDstrengths = (e, i) => {
    try {
      const { value } = e.target;

      const studentStrengthsCopy = [...familyIdentified?.strengths];
      let strength = studentStrengthsCopy?.[i];

      strength = { ...strength, note: value };
      studentStrengthsCopy[i] = strength;

      setFamilyIdentified(prev => ({
        ...prev,
        strengths: studentStrengthsCopy,
      }));
    } catch (error) {
      console.log(error);
    }
  };

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
              onChange={e => handleStudentIDstrengths(e, 0)}
              value={studentIdentified?.strengths?.[0]?.note}
            />
          </FlexBox>

          <FlexBox column rowGap="1rem">
            <Text weight={500}>Student Identified Concerns</Text>
            <TextArea
              onChange={e => handleStudentIDConcerns(e, 0)}
              value={studentIdentified?.concerns?.[0]?.note}
            />
          </FlexBox>

          <FlexBox column rowGap="1rem">
            <Text weight={500}>Family Identified Strengths</Text>
            <TextArea
              onChange={e => handleFamilyIDstrengths(e, 0)}
              value={familyIdentified?.strengths?.[0]?.note}
            />
          </FlexBox>

          <FlexBox column rowGap="1rem">
            <Text weight={500}>Family Identified Concerns</Text>
            <TextArea
              onChange={e => handleFamilyIDConcerns(e, 0)}
              value={familyIdentified?.concerns?.[0]?.note}
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
