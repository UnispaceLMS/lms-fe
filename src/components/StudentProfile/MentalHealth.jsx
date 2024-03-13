import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Text from "@common/Text";
import Loader from "@common/Loader";
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
const defaultCalmingStrategyInfo = Object.freeze({ strategy: "" });

const MentalHealth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [requestLoading, setRequestLoading] = useState(false);
  const [mentalHealthInfo, setMentalHealthInfo] = useState({
    triggers: [],
    calmingStrategies: [],
    toughestTime: studentProfile?.toughestTime || "",
    mentalHealthStudentPerspective:
      studentProfile?.mentalHealthStudentPerspective || "",
    mentalHealthDiagnosis: studentProfile?.mentalHealthDiagnosis || "",
  });

  const {
    triggers,
    calmingStrategies,
    mentalHealthDiagnosis,
    mentalHealthStudentPerspective,
  } = mentalHealthInfo;

  useEffect(() => {
    if (studentProfile) {
      const { triggers, calmingStrategies } = studentProfile || {};
      let triggersArr = [{ ...defaultTriggerInfo }];
      let calmingStrategiesArr = [{ ...defaultCalmingStrategyInfo }];

      if (!!triggers?.length) {
        triggersArr = triggers?.map(trigger => ({ trigger }));
      }
      if (!!calmingStrategies?.length) {
        calmingStrategiesArr = calmingStrategies?.map(strategy => ({
          strategy,
        }));
      }

      setMentalHealthInfo(prev => ({
        ...prev,
        triggers: triggersArr,
        calmingStrategies: calmingStrategiesArr,
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
      setRequestLoading(true);
      const id = router?.query?.id;
      const payload = { id };

      const triggers = mentalHealthInfo?.triggers
        ?.filter(({ trigger }) => !!trigger)
        ?.map(({ trigger }) => trigger);
      const calmingStrategies = mentalHealthInfo?.calmingStrategies
        ?.filter(({ strategy }) => !!strategy)
        ?.map(({ strategy }) => strategy);

      Object.keys(mentalHealthInfo)
        ?.filter(
          key =>
            key !== "triggers" &&
            key !== "calmingStrategies" &&
            !!mentalHealthInfo?.[key]
        )
        ?.forEach(key => {
          payload[key] = mentalHealthInfo?.[key];
        });

      if (!!triggers?.length) payload.triggers = triggers;
      if (!!calmingStrategies?.length)
        payload.calmingStrategies = calmingStrategies;

      dispatch(
        saveUpdateProfile({
          data: payload,
          nextLink: `/student/${id}/profile/personal-life`,
        })
      );
    } catch (error) {
      setRequestLoading(false);
      console.log(error, "Error in saving profile");
    }
  };

  const handleBack = () => router?.back();

  const addEntry = entryType => {
    try {
      const isEntryTypeTrigger = entryType === "triggers";
      let entries = isEntryTypeTrigger ? triggers : calmingStrategies;

      if (isEntryTypeTrigger) {
        entries = [...entries, { ...defaultTriggerInfo }];
      } else {
        entries = [...entries, { ...defaultCalmingStrategyInfo }];
      }

      setMentalHealthInfo(prev => ({ ...prev, [entryType]: entries }));
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

  const handleStrategiesInput = (e, i) => {
    try {
      const { name, value } = e.target;

      const strategiesCopy = [...calmingStrategies];
      let entry = strategiesCopy?.[i];

      entry = { ...entry, [name]: value };
      strategiesCopy[i] = entry;

      setMentalHealthInfo(prev => ({
        ...prev,
        calmingStrategies: strategiesCopy,
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
            columns={["Triggers"]}
            handleChange={handleTriggerInput}
            addEntry={() => addEntry("triggers")}
          />

          {/* Changes post phase 1 - calming strategy -> coping strategies */}
          <MultipleEntryTable
            entries={calmingStrategies}
            columns={["Coping Strategies"]}
            handleChange={handleStrategiesInput}
            addEntry={() => addEntry("calmingStrategies")}
          />
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
