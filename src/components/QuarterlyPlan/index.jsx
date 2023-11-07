import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import Select from "react-select";
import styled from "styled-components";
import { useRouter } from "next/router";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import { SecondaryButton } from "@common/Buttons";

import QuarterlyPlanLayout from "@layouts/QuarterlyPlanLayout";

import { GRAY_25, GRAY_50, GRAY_300, GRAY_600 } from "@/constants/colors";

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

const QuarterlyPlan = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const quarter = router?.query?.quarter || 1;
  const year = router?.query?.year || dayjs()?.year();

  const quarterlyPlanRoute = `/student/${id}/quarterly-plan/${year}/${quarter}`;

  return (
    <QuarterlyPlanLayout>
      <FlexBox column rowGap="1.5rem">
        <FlexBox colGap="0.5rem">
          <Select placeholder="Year" styles={customSelectStyles} />
          <Select placeholder="Quarter" styles={customSelectStyles} />
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
            link={quarterlyPlanRoute + "/grades"}
          />
        </PlansGrid>
      </FlexBox>
    </QuarterlyPlanLayout>
  );
};

export default QuarterlyPlan;
