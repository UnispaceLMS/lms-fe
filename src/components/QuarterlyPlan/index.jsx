import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";
import isEmpty from "lodash.isempty";
import styled from "styled-components";
import { useRouter } from "next/router";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import { SecondaryButton } from "@common/Buttons";

import QuarterlyPlanLayout from "@layouts/QuarterlyPlanLayout";

import { quarters } from "@metadata/quarters";
import { GRAY_25, GRAY_50, GRAY_300, GRAY_600 } from "@constants/colors";
import axiosInstance from "@/axiosInstance";
import urls from "@/urls";

const customSelectStyles = {
  container: baseStyles => ({
    ...baseStyles,
    width: "fit-content",
  }),
  control: baseStyles => ({
    ...baseStyles,
    boxShadow: "none",
    minHeight: "unset",
    fontSize: "0.75rem",
    columnGap: "0.5rem",
    borderColor: GRAY_300,
    borderRadius: "0.5rem",
    padding: "0.5rem 0.75rem",
  }),
  valueContainer: baseStyles => ({
    ...baseStyles,
    padding: 0,
  }),
  input: baseStyles => ({
    ...baseStyles,
    margin: 0,
    padding: 0,
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: baseStyles => ({ ...baseStyles, padding: 0 }),
};

const PlansGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 1.5rem 2.5rem;
  grid-template-columns: 1fr 1fr;
`;

const PlanCard = styled(FlexBox)`
  height: 25.5rem;
  overflow: hidden;
  border-radius: 1.5rem;
  flex-direction: column;
  background-color: ${GRAY_25};
`;

const PlanFooter = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  align-items: center;
  background-color: ${GRAY_50};
  justify-content: space-between;
`;

const ImageContainer = styled(FlexBox)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const RenderPlanCard = ({ plan, link = "", disabled, PlanImage }) => (
  <PlanCard>
    <ImageContainer>{PlanImage}</ImageContainer>

    <PlanFooter>
      <Text bold color={GRAY_600} size="1.25rem">
        {plan}
      </Text>

      {disabled ? (
        <SecondaryButton disabled>View</SecondaryButton>
      ) : (
        <Link href={link}>
          <SecondaryButton>View</SecondaryButton>
        </Link>
      )}
    </PlanFooter>
  </PlanCard>
);

const QuarterlyPlan = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const year = router?.query?.year;
  const quarter = router?.query?.quarter;

  const [loading, setLoading] = useState(true);
  const [planYear, setPlanYear] = useState(null);
  const [planQuarter, setPlanQuarter] = useState(null);
  const [annualPlans, setAnnualPlans] = useState(null);

  const noYearSelected = !year;
  const quarterlyPlanRoute = `/student/${id}/quarterly-plan/${year}/${quarter}`;
  const planOptions = annualPlans
    ? Object?.keys(annualPlans)?.map(year => ({ value: year, label: year }))
    : null;

  useEffect(() => {
    if (router?.isReady) {
      fetchAnnualPlans();

      if (year) {
        setPlanYear({ value: parseInt(year), label: parseInt(year) });
      }
      if (quarter) {
        setPlanQuarter({ value: parseInt(quarter), label: parseInt(quarter) });
      }
    }
  }, [router?.isReady]);

  const fetchAnnualPlans = async () => {
    try {
      if (!id) return;

      setLoading(true);
      const params = { studentId: id };

      const res = await axiosInstance.get(urls.fetchAllAnnualPlans, { params });

      setAnnualPlans(res?.data);
    } catch (error) {
      console.log(error, "Error in fetching Annual Plans");
    } finally {
      setLoading(false);
    }
  };

  const handleYearSelect = year => {
    try {
      setPlanYear(year);
      router.replace(`/student/${id}/quarterly-plan/${year?.value}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuarterSelect = quarter => {
    try {
      setPlanQuarter(quarter);
      router.replace(
        `/student/${id}/quarterly-plan/${planYear?.value}/${quarter?.value}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuarterlyPlanLayout>
      <FlexBox column rowGap="1.5rem">
        <FlexBox colGap="0.5rem">
          <Select
            value={planYear}
            placeholder="Year"
            options={planOptions}
            isDisabled={!planOptions}
            styles={customSelectStyles}
            onChange={handleYearSelect}
          />

          <Select
            options={quarters}
            value={planQuarter}
            placeholder="Quarter"
            isDisabled={!planYear}
            styles={customSelectStyles}
            onChange={handleQuarterSelect}
          />
        </FlexBox>

        <PlansGrid>
          <RenderPlanCard
            plan="Goal"
            PlanImage={
              <Image
                alt="Goal"
                width={252}
                height={189}
                draggable="false"
                src="/assets/images/plan-goal.svg"
              />
            }
            disabled={!planYear || !planQuarter}
            link={quarterlyPlanRoute + "/goal/overview"}
          />

          <RenderPlanCard
            plan="Grades"
            PlanImage={
              <Image
                alt="Grades"
                width={252}
                height={189}
                draggable="false"
                src="/assets/images/plan-grades.svg"
              />
            }
            disabled={!planYear || !planQuarter}
            link={quarterlyPlanRoute + "/grades"}
          />
        </PlansGrid>
      </FlexBox>
    </QuarterlyPlanLayout>
  );
};

export default QuarterlyPlan;
