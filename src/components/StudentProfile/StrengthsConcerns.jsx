import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import MultipleEntryTable from "@common/MultipleEntryTable";
import { PrimaryButton, SecondaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { saveUpdateProfile } from "@redux/Slices/studentSlice";
import { concernEnums, strengthEnums } from "@metadata/strengthsConcerns";

const defaultEntries = Object.freeze({
  concerns: { note: "" },
  strengths: { note: "" },
});

const StrengthsConcerns = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [familyIdentified, setFamilyIdentified] = useState({
    concerns: [],
    strengths: [],
  });
  const [studentIdentified, setStudentIdentified] = useState({
    concerns: [],
    strengths: [],
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
        concerns = [...concerns, familyIdentifiedConcerns];
      }
      if (!!studentIdentifiedConcerns?.length) {
        concerns = [...concerns, studentIdentifiedConcerns];
      }

      if (!!familyIdentifiedStrengths?.length) {
        strengths = [...strengths, familyIdentifiedStrengths];
      }
      if (!!studentIdentifiedStrengths?.length) {
        strengths = [...strengths, studentIdentifiedStrengths];
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

  const addEntry = (identifiedBy, type) => {
    try {
      const isFamilyIdentified = identifiedBy === "family";

      const defaultEntry = defaultEntries?.[type];
      const identifiedEntries = isFamilyIdentified
        ? familyIdentified
        : studentIdentified;

      const entries = [...identifiedEntries?.[type], { ...defaultEntry }];

      if (isFamilyIdentified) {
        setFamilyIdentified(prev => ({ ...prev, [type]: entries }));
      } else {
        setStudentIdentified(prev => ({ ...prev, [type]: entries }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStudentIDConcerns = (e, i) => {
    try {
      const { name, value } = e.target;

      const studentConcernsCopy = [...studentIdentified?.concerns];
      let concern = studentConcernsCopy?.[i];

      concern = { ...concern, [name]: value };
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
      const { name, value } = e.target;

      const studentStrengthsCopy = [...studentIdentified?.strengths];
      let strength = studentStrengthsCopy?.[i];

      strength = { ...strength, [name]: value };
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
      const { name, value } = e.target;

      const familyConcernsCopy = [...familyIdentified?.concerns];
      let concern = familyConcernsCopy?.[i];

      concern = { ...concern, [name]: value };
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
      const { name, value } = e.target;

      const studentStrengthsCopy = [...familyIdentified?.strengths];
      let strength = studentStrengthsCopy?.[i];

      strength = { ...strength, [name]: value };
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

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <FlexBox colGap="2rem" align="flex-start">
            <MultipleEntryTable
              entries={studentIdentified.strengths}
              handleChange={handleStudentIDstrengths}
              columns={["Student Identified Strengths"]}
              addEntry={() => addEntry("student", "strengths")}
            />

            <MultipleEntryTable
              entries={studentIdentified.concerns}
              handleChange={handleStudentIDConcerns}
              columns={["Student Identified Concerns"]}
              addEntry={() => addEntry("student", "concerns")}
            />
          </FlexBox>

          <FlexBox colGap="2rem" align="flex-start">
            <MultipleEntryTable
              entries={familyIdentified.strengths}
              handleChange={handleFamilyIDstrengths}
              columns={["Family Identified Strengths"]}
              addEntry={() => addEntry("family", "strengths")}
            />

            <MultipleEntryTable
              entries={familyIdentified.concerns}
              handleChange={handleFamilyIDConcerns}
              columns={["Family Identified Concerns"]}
              addEntry={() => addEntry("family", "concerns")}
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
