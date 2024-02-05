import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import MultipleEntryTable from "@common/MultipleEntryTable";
import { PrimaryButton, SecondaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { saveUpdateProfile } from "@/redux/Slices/studentSlice";

const defaultEntries = Object.freeze({
  fears: { fear: "" },
  family: { member: "" },
  worries: { worry: "" },
  friends: { friend: "" },
  interests: { interest: "" },
  safetyConceptStruggles: { struggle: "" },
});

const PersonalLife = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [personalLifeInfo, setPersonalLifeInfo] = useState({
    fears: [],
    family: [],
    friends: [],
    worries: [],
    interests: [],
    safetyConceptStruggles: [],
  });

  const { fears, family, friends, worries, interests, safetyConceptStruggles } =
    personalLifeInfo;

  useEffect(() => {
    if (studentProfile) {
      let fears = [{ ...defaultEntries.fears }];
      let family = [{ ...defaultEntries.family }];
      let friends = [{ ...defaultEntries.friends }];
      let worries = [{ ...defaultEntries.worries }];
      let interests = [{ ...defaultEntries.interests }];
      let safetyConceptStruggles = [
        { ...defaultEntries.safetyConceptStruggles },
      ];

      if (!!studentProfile?.fears?.length) {
        fears = studentProfile?.fears?.map(fear => ({ fear }));
      }
      if (!!studentProfile?.family?.length) {
        family = studentProfile?.family?.map(member => ({ member }));
      }
      if (!!studentProfile?.friends?.length) {
        friends = studentProfile?.friends?.map(friend => ({ friend }));
      }
      if (!!studentProfile?.worries?.length) {
        worries = studentProfile?.worries?.map(worry => ({ worry }));
      }
      if (!!studentProfile?.safetyConceptStruggles?.length) {
        safetyConceptStruggles = studentProfile?.safetyConceptStruggles?.map(
          struggle => ({ struggle })
        );
      }
      if (!!studentProfile?.interests?.length) {
        interests = studentProfile?.interests?.map(interest => ({ interest }));
      }

      setPersonalLifeInfo(prev => ({
        ...prev,
        fears,
        family,
        friends,
        worries,
        interests,
        safetyConceptStruggles,
      }));
    }
  }, [studentProfile]);

  const onSave = () => {
    try {
      const id = router?.query?.id;
      const payload = { id };

      const fears = personalLifeInfo?.fears
        ?.filter(({ fear }) => !!fear)
        ?.map(({ fear }) => fear);

      const family = personalLifeInfo?.family
        ?.filter(({ member }) => !!member)
        ?.map(({ member }) => member);

      const friends = personalLifeInfo?.friends
        ?.filter(({ friend }) => !!friend)
        ?.map(({ friend }) => friend);

      const worries = personalLifeInfo?.worries
        ?.filter(({ worry }) => !!worry)
        ?.map(({ worry }) => worry);

      const interests = personalLifeInfo?.interests
        ?.filter(({ interest }) => !!interest)
        ?.map(({ interest }) => interest);

      const struggles = personalLifeInfo?.safetyConceptStruggles
        ?.filter(({ struggle }) => !!struggle)
        ?.map(({ struggle }) => struggle);

      Object.keys(personalLifeInfo)
        ?.filter(
          key =>
            typeof personalLifeInfo?.[key] !== "object" &&
            !!personalLifeInfo?.[key]
        )
        ?.forEach(key => {
          payload[key] = personalLifeInfo?.[key];
        });

      if (!!fears?.length) payload.fears = fears;
      if (!!family?.length) payload.family = family;
      if (!!friends?.length) payload.friends = friends;
      if (!!worries?.length) payload.worries = worries;
      if (!!interests?.length) payload.interests = interests;
      if (!!struggles?.length) payload.safetyConceptStruggles = struggles;

      dispatch(
        saveUpdateProfile({
          data: payload,
          nextLink: `/student/${id}/profile/assistance-support`,
        })
      );
    } catch (error) {
      console.log(error, "Error in saving profile");
    }
  };

  const handleBack = () => router?.back();

  const addEntry = type => {
    try {
      const entryType = personalLifeInfo?.[type];
      const defaultEntry = defaultEntries?.[type];

      const entries = [...entryType, { ...defaultEntry }];

      setPersonalLifeInfo(prev => ({ ...prev, [type]: entries }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFearsInput = (e, i) => {
    try {
      const { name, value } = e.target;

      const fearsCopy = [...fears];
      let fear = fearsCopy?.[i];

      fear = { ...fear, [name]: value };
      fearsCopy[i] = fear;

      setPersonalLifeInfo(prev => ({ ...prev, fears: fearsCopy }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFamilyInput = (e, i) => {
    try {
      const { name, value } = e.target;

      const familyCopy = [...family];
      let familyEntry = familyCopy?.[i];

      familyEntry = { ...familyEntry, [name]: value };
      familyCopy[i] = familyEntry;

      setPersonalLifeInfo(prev => ({ ...prev, family: familyCopy }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleFriendsInput = (e, i) => {
    try {
      const { name, value } = e.target;

      const friendsCopy = [...friends];
      let friend = friendsCopy?.[i];

      friend = { ...friend, [name]: value };
      friendsCopy[i] = friend;

      setPersonalLifeInfo(prev => ({ ...prev, friends: friendsCopy }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleWorriesInput = (e, i) => {
    try {
      const { name, value } = e.target;

      const worriesCopy = [...worries];
      let worry = worriesCopy?.[i];

      worry = { ...worry, [name]: value };
      worriesCopy[i] = worry;

      setPersonalLifeInfo(prev => ({ ...prev, worries: worriesCopy }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleInterestsInput = (e, i) => {
    try {
      const { name, value } = e.target;

      const interestsCopy = [...interests];
      let interest = interestsCopy?.[i];

      interest = { ...interest, [name]: value };
      interestsCopy[i] = interest;

      setPersonalLifeInfo(prev => ({ ...prev, interests: interestsCopy }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStrugglesInput = (e, i) => {
    try {
      const { name, value } = e.target;

      const strugglesCopy = [...safetyConceptStruggles];
      let struggle = strugglesCopy?.[i];

      struggle = { ...struggle, [name]: value };
      strugglesCopy[i] = struggle;

      setPersonalLifeInfo(prev => ({
        ...prev,
        safetyConceptStruggles: strugglesCopy,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={5} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Personal Life
        </Text>

        <FlexBox column rowGap="1.5rem" align="flex-start">
          <MultipleEntryTable
            entries={interests}
            columns={["Interests"]}
            handleChange={handleInterestsInput}
            addEntry={() => addEntry("interests")}
          />

          <FlexBox colGap="2rem" align="flex-start">
            <MultipleEntryTable
              entries={family}
              columns={["Family"]}
              handleChange={handleFamilyInput}
              addEntry={() => addEntry("family")}
            />

            <MultipleEntryTable
              entries={friends}
              columns={["Friends"]}
              handleChange={handleFriendsInput}
              addEntry={() => addEntry("friends")}
            />
          </FlexBox>

          <FlexBox colGap="2rem" align="flex-start">
            <MultipleEntryTable
              entries={worries}
              columns={["Worries"]}
              handleChange={handleWorriesInput}
              addEntry={() => addEntry("worries")}
            />

            <MultipleEntryTable
              entries={fears}
              columns={["Fears"]}
              handleChange={handleFearsInput}
              addEntry={() => addEntry("fears")}
            />
          </FlexBox>

          <MultipleEntryTable
            columns={["Safety Concerns"]}
            entries={safetyConceptStruggles}
            handleChange={handleStrugglesInput}
            addEntry={() => addEntry("safetyConceptStruggles")}
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

export default PersonalLife;
