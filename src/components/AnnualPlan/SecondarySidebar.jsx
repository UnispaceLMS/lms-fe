import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
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

const SecondarySidebar = () => {
  const router = useRouter();
  const student = useSelector(state => state?.student?.profile);
  const commonStudentGoalRoute = `/student/${student?.id}/annual-plan/goal`;

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
      <Link href={commonStudentGoalRoute + "/overview"}>
        <Option selected={isOverviewPage}>
          <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
            Overview
          </Text>
        </Option>
      </Link>
      <Link href={commonStudentGoalRoute + "/health-wellness"}>
        <Option selected={isHealthWellnessPage}>
          <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
            Health & wellness
          </Text>
        </Option>
      </Link>
      <Link href={commonStudentGoalRoute + "/personal-management"}>
        <Option selected={isPersonalManagementPage}>
          <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
            Personal Management
          </Text>
        </Option>
      </Link>
      <Link href={commonStudentGoalRoute + "/home-management"}>
        <Option selected={isHomeManagementPage}>
          <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
            Home Management
          </Text>
        </Option>
      </Link>
      <Link href={commonStudentGoalRoute + "/safety"}>
        <Option selected={isSafetyPage}>
          <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
            Safety
          </Text>
        </Option>
      </Link>
      <Link href={commonStudentGoalRoute + "/transportation"}>
        <Option selected={isTransportationPage}>
          <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
            Transportation
          </Text>
        </Option>
      </Link>
      <Link href={commonStudentGoalRoute + "/healthy-relationship"}>
        <Option selected={isHealthyRelationshipPage}>
          <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
            Healthy Relationship
          </Text>
        </Option>
      </Link>
      <Link href={commonStudentGoalRoute + "money-management"}>
        <Option selected={isMoneyManagementPage}>
          <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
            Money Management
          </Text>
        </Option>
      </Link>
      <Link href={commonStudentGoalRoute + "/employment"}>
        <Option selected={isEmploymentPage}>
          <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
            Employment
          </Text>
        </Option>
      </Link>
      <Link href={commonStudentGoalRoute + "/misc"}>
        <Option selected={isMiscPage}>
          <Text color={GRAY_600} size="0.875rem" lineHeight="1.25rem">
            Misc
          </Text>
        </Option>
      </Link>
    </Wrapper>
  );
};

export default SecondarySidebar;
