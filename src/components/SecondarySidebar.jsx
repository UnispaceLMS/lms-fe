import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";

import {
  WHITE,
  GRAY_100,
  GRAY_200,
  GRAY_600,
  PRIMARY_500,
} from "@constants/colors";

const Wrapper = styled(FlexBox)`
  height: 100%;
  row-gap: 0.25rem;
  padding: 4rem 0.5rem;
  flex-direction: column;
  background-color: ${GRAY_100};
  border: 1px solid ${GRAY_200};
`;

const Option = styled(FlexBox)`
  width: 100%;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${PRIMARY_500};

      ${Text} {
        color: ${WHITE};
      }
    `}
`;

let commonStudentGoalRoute;
const RenderOption = ({ link, text, selected }) => (
  <Link href={commonStudentGoalRoute + link}>
    <Option selected={selected}>
      <Text weight={500} color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
        {text}
      </Text>
    </Option>
  </Link>
);

const SecondarySidebar = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const quarter = router?.query?.quarter || 1;
  const year = router?.query?.year || dayjs()?.year();
  const isAnnualPlanPage = router?.pathname?.includes("/annual-plan");

  const quarterRoute = !isAnnualPlanPage ? `${quarter}/` : "";
  const planType = isAnnualPlanPage ? "annual-plan" : "quarterly-plan";
  commonStudentGoalRoute = `/student/${id}/${planType}/${year}/${quarterRoute}goal`;

  const isHealthWellnessPage = router?.pathname?.includes(
    "/goal/health-wellness"
  );
  const isHomeManagementPage = router?.pathname?.includes(
    "/goal/home-management"
  );
  const isTransportationPage = router?.pathname?.includes(
    "/goal/transportation"
  );
  const isMoneyManagementPage = router?.pathname?.includes(
    "/goal/money-management"
  );
  const isMiscPage = router?.pathname?.includes("/goal/misc");
  const isPersonalManagementPage = router?.pathname?.includes(
    "/goal/personal-management"
  );
  const isHealthyRelationshipPage = router?.pathname?.includes(
    "/goal/healthy-relationship"
  );
  const isSafetyPage = router?.pathname?.includes("/goal/safety");
  const isOverviewPage = router?.pathname?.includes("/goal/overview");
  const isEmploymentPage = router?.pathname?.includes("/goal/employment");

  return (
    <Wrapper>
      <RenderOption
        text="Overview"
        link="/overview"
        selected={isOverviewPage}
      />

      <RenderOption
        link="/health-wellness"
        text="Health & wellness"
        selected={isHealthWellnessPage}
      />

      <RenderOption
        text="Personal Management"
        link="/personal-management"
        selected={isPersonalManagementPage}
      />

      <RenderOption
        text="Home Management"
        link="/home-management"
        selected={isHomeManagementPage}
      />

      <RenderOption text="Safety" link="/safety" selected={isSafetyPage} />

      <RenderOption
        text="Transportation"
        link="/transportation"
        selected={isTransportationPage}
      />

      <RenderOption
        text="Healthy Relationship"
        link="/healthy-relationship"
        selected={isHealthyRelationshipPage}
      />

      <RenderOption
        text="Money Management"
        link="/money-management"
        selected={isMoneyManagementPage}
      />

      <RenderOption
        text="Employment"
        link="/employment"
        selected={isEmploymentPage}
      />

      <RenderOption text="Misc" link="/misc" selected={isMiscPage} />
    </Wrapper>
  );
};

export default SecondarySidebar;
