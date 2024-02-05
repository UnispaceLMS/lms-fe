import { useEffect, useState } from "react";
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

import { GRAY_800 } from "@constants/colors";
import { saveUpdateProfile } from "@/redux/Slices/studentSlice";

const defaultTriggerInfo = Object.freeze({ trigger: "" });

const MentalHealth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [mentalHealthInfo, setMentalHealthInfo] = useState({
    triggers: [],
    toughestTime: studentProfile?.toughestTime || "",
    calmingStrategy: studentProfile?.calmingStrategy || "",
    mentalHealthStudentPerspective:
      studentProfile?.mentalHealthStudentPerspective || "",
    mentalHealthDiagnosis: studentProfile?.mentalHealthDiagnosis || "",
  });

  const {
    triggers,
    calmingStrategy,
    mentalHealthDiagnosis,
    mentalHealthStudentPerspective,
  } = mentalHealthInfo;

  useEffect(() => {
    if (studentProfile) {
      const { triggers } = studentProfile || {};
      let triggersArr = [{ ...defaultTriggerInfo }];

      if (!!triggers?.length) {
        triggersArr = triggers?.map(trigger => ({ trigger }));
      }

      setMentalHealthInfo(prev => ({
        ...prev,
        triggers: triggersArr,
        toughestTime: studentProfile?.toughestTime || "",
        calmingStrategy: studentProfile?.calmingStrategy || "",
        mentalHealthStudentPerspective:
          studentProfile?.mentalHealthStudentPerspective || "",
        mentalHealthDiagnosis: studentProfile?.mentalHealthDiagnosis || "",
      }));
    }
  }, [studentProfile]);

  const handleInput = e => {
    try {
      const { name, value } = e.target;

      setMentalHealthInfo(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {
    try {
      const id = router?.query?.id;
      const payload = { id };

      const triggers = mentalHealthInfo?.triggers
        ?.filter(({ trigger }) => !!trigger)
        ?.map(({ trigger }) => trigger);

      Object.keys(mentalHealthInfo)
        ?.filter(key => key !== "triggers" && !!mentalHealthInfo?.[key])
        ?.forEach(key => {
          payload[key] = mentalHealthInfo?.[key];
        });

      if (!!triggers?.length) payload.triggers = triggers;

      dispatch(
        saveUpdateProfile({
          data: payload,
          nextLink: `/student/${id}/profile/personal-life`,
        })
      );
    } catch (error) {
      console.log(error, "Error in saving profile");
    }
  };

  const handleBack = () => router?.back();

  const addTrigger = () => {
    try {
      const entries = [...triggers, { ...defaultTriggerInfo }];

      setMentalHealthInfo(prev => ({ ...prev, triggers: entries }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTriggerInput = (e, i) => {
    try {
      const { name, value } = e.target;

      const triggersCopy = [...triggers];
      let trigger = triggersCopy?.[i];

      trigger = { ...trigger, [name]: value };
      triggersCopy[i] = trigger;

      setMentalHealthInfo(prev => ({ ...prev, triggers: triggersCopy }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={4} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Mental Health Records
        </Text>

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Diagnosis</Text>
              <TextInput
                onChange={handleInput}
                placeholder="Type Here"
                name="mentalHealthDiagnosis"
                value={mentalHealthDiagnosis}
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Student Perspective</Text>
              <TextInput
                onChange={handleInput}
                placeholder="Type Here"
                name="mentalHealthStudentPerspective"
                value={mentalHealthStudentPerspective}
              />
            </InputContainer>
          </FlexBox>

          <MultipleEntryTable
            entries={triggers}
            addEntry={addTrigger}
            columns={["Triggers"]}
            handleChange={handleTriggerInput}
          />

          {/* Changes post phase 1 - calming strategy -> coping strategy */}
          <InputContainer>
            <Text color={GRAY_800}>Coping Strategy</Text>
            <TextInput
              onChange={handleInput}
              name="calmingStrategy"
              placeholder="Type Here"
              value={calmingStrategy}
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

export default MentalHealth;
