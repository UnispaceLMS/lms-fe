import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";
import styled from "styled-components";
import { useRouter } from "next/router";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import { SecondaryButton } from "@common/Buttons";

import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import { GRAY_25, GRAY_50, GRAY_300, GRAY_600 } from "@constants/colors";

const customSelectStyles = {
  container: baseStyles => ({
    ...baseStyles,
    width: "fit-content",
    marginBottom: "1.5rem",
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

const RenderPlanCard = ({ plan, link = "", PlanImage }) => (
  <PlanCard>
    <ImageContainer>{PlanImage}</ImageContainer>

    <PlanFooter>
      <Text bold color={GRAY_600} size="1.25rem">
        {plan}
      </Text>

      <Link href={link}>
        <SecondaryButton>Create</SecondaryButton>
      </Link>
    </PlanFooter>
  </PlanCard>
);

const AnnualPlan = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const year = router?.query?.year || dayjs()?.year();

  const annualPlanRoute = `/student/${id}/annual-plan/${year}`;

  return (
    <AnnualPlanLayout>
      <Select placeholder="Year" styles={customSelectStyles} />

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
          link={annualPlanRoute + "/goal/overview"}
        />

        <RenderPlanCard
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
