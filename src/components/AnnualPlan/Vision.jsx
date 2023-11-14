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
  padding: 1rem;
  row-gap: 0.75rem;
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_200};
`;

const Vision = () => {
  const router = useRouter();

  const [vision, setVision] = useState({
    employmentGoals: "",
    independentLivingGoals: "",
    communityParticipation: "",
    postSecondaryEducationTraining: "",
  });
  const [loading, setLoading] = useState(false);
  const [ctaDisabled, setCtaDisabled] = useState(false);

  const {
    employmentGoals,
    independentLivingGoals,
    communityParticipation,
    postSecondaryEducationTraining,
  } = vision;

  useEffect(() => {
    if (router?.isReady) {
      fetchPlanData();
    }
  }, [router?.isReady]);

  const handleInput = e => {
    try {
      const { name, value } = e.target;

      setVision(prev => ({ ...prev, [name]: value }));
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
      const data = res?.data?.vision;

      if (data) setVision(data);
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
        vision,
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
      <FlexBox column rowGap="1.5rem" align="flex-end">
        <Text weight={500} size="1.125rem">
          Student Post-Secondary Vision
        </Text>

        <Container>
          <Text weight={500} size="1.125rem">
            Career/Employment Goals
          </Text>
          <TextArea
            rows={1}
            placeholder="Enter"
            onChange={handleInput}
            name="employmentGoals"
            value={employmentGoals}
          />

          <Text weight={500} size="1.125rem">
            Independent Living Goals
          </Text>
          <TextArea
            rows={1}
            placeholder="Enter"
            onChange={handleInput}
            name="independentLivingGoals"
            value={independentLivingGoals}
          />

          <Text weight={500} size="1.125rem">
            Community Participation
          </Text>
          <TextArea
            rows={1}
            placeholder="Enter"
            onChange={handleInput}
            name="communityParticipation"
            value={communityParticipation}
          />

          <Text weight={500} size="1.125rem">
            Post-Secondary Education/Training
          </Text>
          <TextArea
            rows={1}
            placeholder="Enter"
            onChange={handleInput}
            name="postSecondaryEducationTraining"
            value={postSecondaryEducationTraining}
          />
        </Container>

        <PrimaryButton onClick={onSave} disabled={ctaDisabled}>
          Save
        </PrimaryButton>
      </FlexBox>
    </AnnualPlanLayout>
  );
};

export default Vision;
