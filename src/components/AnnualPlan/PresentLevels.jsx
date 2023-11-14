import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import Text from "@common/Text";
import Loader from "@common/Loader";
import FlexBox from "@common/FlexBox";
import TextArea from "@common/TextArea";
import { PrimaryButton } from "@common/Buttons";

import urls from "@urls";
import axiosInstance from "@axiosInstance";

import { GRAY_200, WHITE } from "@constants/colors";

const LoaderWrapper = styled(FlexBox)`
  flex: 1;
`;

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  row-gap: 0.75rem;
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_200};
`;

const PresentLevels = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [presentLevel, setPresentLevel] = useState({
    employmentSkills: "",
    academicAchievement: "",
    independentLivingSkills: "",
    communityParticipationSkills: "",
    employmentSkillsImpactResultNeeded: "",
    academicAchievementImpactResultNeeded: "",
    independentLivingSkillsImpactResultNeeded: "",
    communityParticipationSkillsImpactResultNeeded: "",
  });
  const [ctaDisabled, setCtaDisabled] = useState(false);

  const {
    employmentSkills,
    academicAchievement,
    independentLivingSkills,
    communityParticipationSkills,
    employmentSkillsImpactResultNeeded,
    academicAchievementImpactResultNeeded,
    independentLivingSkillsImpactResultNeeded,
    communityParticipationSkillsImpactResultNeeded,
  } = presentLevel;

  useEffect(() => {
    if (router?.isReady) {
      fetchPlanData();
    }
  }, [router?.isReady]);

  const handleInput = e => {
    try {
      const { name, value } = e.target;

      setPresentLevel(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlanData = async () => {
    try {
      const { id, year } = router?.query || {};

      if (!id || !year) return;

      setLoading(true);
      setCtaDisabled(true);

      const params = { year: parseInt(year), studentId: parseInt(id) };

      const res = await axiosInstance.get(urls.fetchAllAnnualPlans, { params });
    } catch (error) {
      console.log(error, "Error in fetching plan data");
    } finally {
      setLoading(false);
      setCtaDisabled(false);
    }
  };

  const onSave = async () => {
    try {
      const { id, year } = router?.query || {};

      if (!id || !year) return;

      setCtaDisabled(true);

      const payload = {
        presentLevel,
        year: parseInt(year),
        studentId: parseInt(id),
      };

      await axiosInstance.put(urls.createUpdateAnnualPlan, payload);
    } catch (error) {
      console.log(error, "Error in saving");
    } finally {
      setCtaDisabled(false);
    }
  };

  if (loading) {
    return (
      <AnnualPlanLayout>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </AnnualPlanLayout>
    );
  }

  return (
    <AnnualPlanLayout>
      <FlexBox column rowGap="1.5rem">
        <Text weight={500} size="1.125rem">
          Present Levels
        </Text>

        <Container>
          <Text weight={500} size="1.125rem">
            Academic Achievement
          </Text>
          <TextArea
            rows={1}
            placeholder="Enter"
            onChange={handleInput}
            name="academicAchievement"
            value={academicAchievement}
          />

          <Text weight={500} size="0.875rem">
            Impact and Resulting Need
          </Text>
          <TextArea
            rows={1}
            placeholder="Enter"
            onChange={handleInput}
            name="academicAchievementImpactResultNeeded"
            value={academicAchievementImpactResultNeeded}
          />
        </Container>

        <Container>
          <Text weight={500} size="1.125rem">
            Employment/Career Skills
          </Text>
          <TextArea
            rows={1}
            placeholder="Enter"
            onChange={handleInput}
            name="employmentSkills"
            value={employmentSkills}
          />

          <Text weight={500} size="0.875rem">
            Impact and Resulting Need
          </Text>
          <TextArea
            rows={1}
            placeholder="Enter"
            onChange={handleInput}
            name="employmentSkillsImpactResultNeeded"
            value={employmentSkillsImpactResultNeeded}
          />
        </Container>

        <Container>
          <Text weight={500} size="1.125rem">
            Independent Living Skills
          </Text>
          <TextArea
            rows={1}
            placeholder="Enter"
            onChange={handleInput}
            name="independentLivingSkills"
            value={independentLivingSkills}
          />

          <Text weight={500} size="0.875rem">
            Impact and Resulting Need
          </Text>
          <TextArea
            rows={1}
            placeholder="Enter"
            onChange={handleInput}
            name="independentLivingSkillsImpactResultNeeded"
            value={independentLivingSkillsImpactResultNeeded}
          />
        </Container>

        <FlexBox column rowGap="0.75rem" align="flex-end">
          <Container>
            <Text weight={500} size="1.125rem">
              Community Participation Skills
            </Text>
            <TextArea
              rows={1}
              placeholder="Enter"
              onChange={handleInput}
              name="communityParticipationSkills"
              value={communityParticipationSkills}
            />

            <Text weight={500} size="0.875rem">
              Impact and Resulting Need
            </Text>
            <TextArea
              rows={1}
              placeholder="Enter"
              onChange={handleInput}
              name="communityParticipationSkillsImpactResultNeeded"
              value={communityParticipationSkillsImpactResultNeeded}
            />
          </Container>

          <PrimaryButton onClick={onSave} disabled={ctaDisabled}>
            Save
          </PrimaryButton>
        </FlexBox>
      </FlexBox>
    </AnnualPlanLayout>
  );
};

export default PresentLevels;
