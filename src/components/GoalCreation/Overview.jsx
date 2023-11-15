import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import cloneDeep from "lodash.clonedeep";

import Text from "@common/Text";
import Loader from "@common/Loader";
import FlexBox from "@common/FlexBox";
import TextArea from "@common/TextArea";
import { PrimaryButton } from "@common/Buttons";

import urls from "@urls";
import axiosInstance from "@axiosInstance";

import { WHITE, GRAY_200 } from "@constants/colors";

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

const Overview = ({ isQuarterlyPlan }) => {
  const router = useRouter();

  const [overview, setOverview] = useState({
    employment: "",
    education: "",
    independentLiving: "",
    communityParticipation: "",
  });
  const [loading, setLoading] = useState(false);
  const [ctaDisabled, setCtaDisabled] = useState(false);

  const { employment, education, independentLiving, communityParticipation } =
    overview;

  useEffect(() => {
    if (router.isReady) {
      fetchPlanDetails();
    }
  }, [router.isReady]);

  const fetchPlanDetails = async () => {
    try {
      const { id, year, quarter } = router?.query || {};

      if (!id || !year) {
        setLoading(false);
        setCtaDisabled(false);
        return;
      }
      if (isQuarterlyPlan && !quarter) {
        setLoading(false);
        setCtaDisabled(false);
        return;
      }

      const params = { year: parseInt(year), studentId: parseInt(id) };

      if (isQuarterlyPlan) params.quarterNumber = parseInt(quarter);

      setLoading(true);
      setCtaDisabled(true);

      const URL = isQuarterlyPlan
        ? urls.fetchQuarterlyReport
        : urls.fetchAnnualPlan;

      const res = await axiosInstance.get(URL, { params });
      let overviewData = res?.data?.goal?.overview || null;

      if (overviewData) {
        overviewData = cloneDeep(overviewData);
        setOverview({ ...overviewData });
      }
    } catch (error) {
      console.log(error, "Error in fetching annual plan");
    } finally {
      setLoading(false);
      setCtaDisabled(false);
    }
  };

  const handleInput = e => {
    try {
      const { name, value } = e.target;

      setOverview(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const saveOverview = async () => {
    try {
      setCtaDisabled(true);

      const { id, year } = router?.query || {};

      if (!id || !year) return;

      const payload = { year, studentId: id, goal: { overview } };

      await axiosInstance.put(urls.createUpdateAnnualPlan, payload);
    } catch (error) {
      console.log(error, "Error in saving Goals - Overview");
    } finally {
      setCtaDisabled(false);
    }
  };

  if (loading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  return (
    <FlexBox column width="100%" rowGap="1.5rem">
      <Text size="1.125rem">Goal</Text>

      <Text size="1.125rem">Overview</Text>

      <FlexBox column rowGap="0.75rem" align="flex-end">
        <Container>
          <Text size="1.125rem">Independent Living</Text>

          <TextArea
            rows={1}
            placeholder="Enter"
            onChange={handleInput}
            name="independentLiving"
            value={independentLiving}
          />

          <Text size="1.125rem">College/Education</Text>

          <TextArea
            rows={1}
            name="education"
            value={education}
            placeholder="Enter"
            onChange={handleInput}
          />

          <Text size="1.125rem">Community Participation</Text>

          <TextArea
            rows={1}
            placeholder="Enter"
            onChange={handleInput}
            name="communityParticipation"
            value={communityParticipation}
          />

          <Text size="1.125rem">Career/Employment</Text>

          <TextArea
            rows={1}
            name="employment"
            value={employment}
            placeholder="Enter"
            onChange={handleInput}
          />
        </Container>

        <PrimaryButton onClick={saveOverview} disabled={ctaDisabled}>
          Save
        </PrimaryButton>
      </FlexBox>
    </FlexBox>
  );
};

export default Overview;
