import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";
import isEmpty from "lodash.isempty";
import styled from "styled-components";
import { useRouter } from "next/router";
import { IoAddCircle } from "react-icons/io5";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import { SecondaryButton } from "@common/Buttons";

import CreatePlanModal from "@components/CreatePlanModal";

import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import urls from "@urls";
import axiosInstance from "@axiosInstance";

import {
  WHITE,
  GRAY_25,
  GRAY_50,
  GRAY_300,
  GRAY_600,
  PRIMARY_600,
} from "@constants/colors";

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
    "&:hover": {
      borderColor: GRAY_300,
    },
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

const NewPlanButton = styled.button`
  border: none;
  cursor: pointer;
  column-gap: 0.5rem;
  align-items: center;
  display: inline-flex;
  border-radius: 0.5rem;
  padding: 0.625rem 1rem;
  background-color: ${PRIMARY_600};

  svg {
    min-width: 0.875rem;
    min-height: 0.875rem;
  }
`;

const RenderPlanCard = ({ plan, link = "", disabled, PlanImage }) => (
  <PlanCard>
    <ImageContainer>{PlanImage}</ImageContainer>

    <PlanFooter>
      <Text bold color={GRAY_600} size="1.25rem">
        {plan}
      </Text>

      {disabled ? (
        <SecondaryButton disabled>Create</SecondaryButton>
      ) : (
        <Link href={link}>
          <SecondaryButton>Create</SecondaryButton>
        </Link>
      )}
    </PlanFooter>
  </PlanCard>
);

const AnnualPlan = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const year = router?.query?.year;

  const [loading, setLoading] = useState(true);
  const [planYear, setPlanYear] = useState(null);
  const [annualPlans, setAnnualPlans] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const noYearSelected = !year;
  const yearString = !noYearSelected ? `/${year}` : "";
  const annualPlanRoute = `/student/${id}/annual-plan${yearString}`;
  const planOptions = annualPlans
    ? Object?.keys(annualPlans)?.map(year => ({ value: year, label: year }))
    : null;

  useEffect(() => {
    if (router?.isReady) {
      fetchAnnualPlans();

      if (year) {
        setPlanYear({ value: parseInt(year), label: parseInt(year) });
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
      if (isEmpty(res?.data)) setShowCreateModal(true);
    } catch (error) {
      console.log(error, "Error in fetching Annual Plans");
    } finally {
      setLoading(false);
    }
  };

  const handleYearSelect = year => {
    try {
      setPlanYear(year);
      router.push(`/student/${id}/annual-plan/${year?.value}`);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleShowCreateModal = () => setShowCreateModal(prev => !prev);

  return (
    <AnnualPlanLayout>
      {showCreateModal && (
        <CreatePlanModal toggleModal={toggleShowCreateModal} />
      )}

      <FlexBox
        width="100%"
        align="center"
        margin="0 0 1.5rem"
        justify="space-between"
      >
        <Select
          value={planYear}
          placeholder="Year"
          options={planOptions}
          isDisabled={!planOptions}
          styles={customSelectStyles}
          onChange={handleYearSelect}
        />

        {!noYearSelected && (
          <NewPlanButton onClick={toggleShowCreateModal}>
            <Text weight={500} size="0.75rem" color={WHITE}>
              Create new plan
            </Text>
            <IoAddCircle color={WHITE} />
          </NewPlanButton>
        )}
      </FlexBox>

      <PlansGrid>
        <RenderPlanCard
          plan="Goal"
          disabled={!planYear}
          PlanImage={
            <Image
              alt="Goal"
              width={252}
              height={189}
              draggable="false"
              src="/assets/images/plan-goal.svg"
            />
          }
          link={annualPlanRoute + "/goal/overview"}
        />

        <RenderPlanCard
          disabled={!planYear}
          plan="Present Levels"
          PlanImage={
            <Image
              alt="Goal"
              width={252}
              height={189}
              draggable="false"
              src="/assets/images/plan-present-levels.svg"
            />
          }
          link={annualPlanRoute + "/present-levels"}
        />

        <RenderPlanCard
          plan="Assessment"
          disabled={!planYear}
          PlanImage={
            <Image
              alt="Assessment"
              width={382}
              height={172}
              draggable="false"
              src="/assets/images/plan-assessment.svg"
            />
          }
          link={annualPlanRoute + "/assessment"}
        />

        <RenderPlanCard
          plan="Vision"
          disabled={!planYear}
          PlanImage={
            <Image
              alt="Vision"
              width={277}
              height={231}
              draggable="false"
              src="/assets/images/plan-vision.svg"
            />
          }
          link={annualPlanRoute + "/vision"}
        />
      </PlansGrid>
    </AnnualPlanLayout>
  );
};

export default AnnualPlan;
