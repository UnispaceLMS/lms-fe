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

const MentalHealth = () => {
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [mentalHealthInfo, setMentalHealthInfo] = useState({
    triggers: studentProfile?.triggers || [],
    toughestTime: studentProfile?.toughestTime || "",
    calmingStrategy: studentProfile?.calmingStrategy || "",
    mentalHealthStudentPerspective:
      studentProfile?.mentalHealthStudentPerspective || "",
    mentalHealthDiagnosis: studentProfile?.mentalHealthDiagnosis || "",
    peopleCopingMechanism: studentProfile?.peopleCopingMechanism || "",
    objectCopingMechanism: studentProfile?.objectCopingMechanism || "",
    activityCopingMechanism: studentProfile?.activityCopingMechanism || "",
  });

  const {
    triggers,
    toughestTime,
    calmingStrategy,
    mentalHealthDiagnosis,
    peopleCopingMechanism,
    objectCopingMechanism,
    activityCopingMechanism,
    mentalHealthStudentPerspective,
  } = mentalHealthInfo;

  useEffect(() => {
    if (studentProfile)
      setMentalHealthInfo(prev => ({
        ...prev,
        triggers: studentProfile?.triggers || [],
        toughestTime: studentProfile?.toughestTime || "",
        calmingStrategy: studentProfile?.calmingStrategy || "",
        mentalHealthStudentPerspective:
          studentProfile?.mentalHealthStudentPerspective || "",
        mentalHealthDiagnosis: studentProfile?.mentalHealthDiagnosis || "",
        peopleCopingMechanism: studentProfile?.peopleCopingMechanism || "",
        objectCopingMechanism: studentProfile?.objectCopingMechanism || "",
        activityCopingMechanism: studentProfile?.activityCopingMechanism || "",
      }));
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
      const id = studentProfile?.id;
      const payload = { id };

      Object.keys(mentalHealthInfo)
        ?.filter(key => !!mentalHealthInfo?.[key])
        ?.forEach(key => {
          payload[key] = mentalHealthInfo?.[key];
        });

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

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Triggers</Text>
              <TextInput
                name="triggers"
                value={triggers}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Toughest Time</Text>
              <TextInput
                name="toughestTime"
                value={toughestTime}
                onChange={handleInput}
                placeholder="Type Here"
              />
            </InputContainer>
          </FlexBox>

          <FlexBox colGap="2rem">
            <InputContainer>
              <Text color={GRAY_800}>Coping Mechanism : Objects</Text>
              <TextInput
                onChange={handleInput}
                placeholder="Type Here"
                name="objectCopingMechanism"
                value={objectCopingMechanism}
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Coping Mechanism : Activities</Text>
              <TextInput
                onChange={handleInput}
                placeholder="Type Here"
                name="activityCopingMechanism"
                value={activityCopingMechanism}
              />
            </InputContainer>

            <InputContainer>
              <Text color={GRAY_800}>Coping Mechanism : People</Text>
              <TextInput
                onChange={handleInput}
                placeholder="Type Here"
                name="peopleCopingMechanism"
                value={peopleCopingMechanism}
              />
            </InputContainer>
          </FlexBox>

          <InputContainer>
            <Text color={GRAY_800}>Calming Strategy</Text>
            <TextInput
              onChange={handleInput}
              name="calmingStrategy"
              placeholder="Type Here"
              value={calmingStrategy}
            />
          </InputContainer>
        </FlexBox>

        <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
      </FlexBox>
    </Wrapper>
  );
};

export default MentalHealth;
