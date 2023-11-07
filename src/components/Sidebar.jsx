import { useRef } from "react";
import {
  MdLogout,
  MdPersonOutline,
  MdOutlineEventNote,
  MdOutlineTableChart,
  MdOutlineDonutSmall,
} from "react-icons/md";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import NameInitials from "@common/NameInitials";

import {
  WHITE,
  GRAY_100,
  GRAY_200,
  GRAY_300,
  GRAY_600,
  PRIMARY_900,
  PRIMARY_500,
} from "@constants/colors";
import { toggleSidebar } from "@redux/Slices/sidebarSlice";

const Wrapper = styled(FlexBox)`
  top: 0;
  left: 0;
  flex: 1;
  width: 4rem;
  height: 100%;
  position: fixed;
  align-items: center;
  flex-direction: column;
  padding: 0.5rem 0.625rem;
  background-color: ${GRAY_100};
  justify-content: space-between;
  transition: width 250ms linear;
  border-right: 1px solid ${GRAY_200};
  box-shadow: 0.5px 2px 2px 0px rgba(98, 98, 98, 0.25);

  ${({ expanded }) =>
    expanded &&
    css`
      width: 12.75rem;

      ${TextContainer} {
        opacity: 1;
        margin-left: 0.5rem;
        grid-template-columns: 1fr;
      }
    `}
`;

const TopHalf = styled(FlexBox)`
  width: 100%;
  row-gap: 1.25rem;
  align-items: center;
  flex-direction: column;
`;

const BottomHalf = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
`;

const LogoContainer = styled(FlexBox)`
  width: 100%;
  cursor: pointer;
  padding: 0.25rem;
  align-items: center;
  justify-content: flex-start;

  svg {
    min-width: 2.25rem;
  }
`;

const NavItem = styled(FlexBox)`
  width: 100%;
  cursor: pointer;
  padding: 0.8rem;
  align-items: center;
  border-radius: 0.75rem;
  justify-content: flex-start;

  svg {
    color: ${GRAY_600};
    min-width: 1.25rem;
    min-height: 1.25rem;
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${PRIMARY_500};

      svg {
        color: ${WHITE};
      }

      ${TextContainer} {
        span {
          color: ${WHITE};
        }
      }
    `}

  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
`;

const TextContainer = styled.div`
  opacity: 0;
  min-width: 0;
  display: grid;
  overflow: hidden;
  transition: all 250ms;
  grid-template-columns: 0fr;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.75rem;
    color: ${PRIMARY_900};
  }

  span {
    color: ${GRAY_600};
    font-size: 0.875rem;
    white-space: nowrap;
  }
`;

const Divider = styled.div`
  height: 0;
  width: 88.5%;
  align-self: center;
  border-top: 1px solid ${GRAY_300};
`;

const InitialsContainer = styled(FlexBox)`
  width: 1.5rem;
  height: 1.5rem;
`;

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const sidebarRef = useRef(null);

  const id = router?.query?.id;
  const quarter = router?.query?.quarter || 1;
  const year = router?.query?.year || dayjs()?.year();

  const isRosterPage = router?.pathname?.includes("/roster");
  const isStudentPage = router?.pathname?.includes("/student");
  const isProfilePage = router?.pathname?.includes("/profile");
  const isDashboard = router?.pathname?.includes("/dashboard");
  const isAnnualPlanPage = router?.pathname?.includes("/annual-plan");
  const isQuarterlyReportPage = router?.pathname?.includes("/quarterly-plan");

  const expanded = useSelector(state => state.sidebar?.expanded);

  const toggleExpanded = () => dispatch(toggleSidebar());

  const goHome = () => router.push("/");

  return (
    <Wrapper ref={sidebarRef} expanded={expanded}>
      <TopHalf>
        <LogoContainer onClick={goHome}>
          <Image
            priority
            width={36}
            height={36}
            draggable="false"
            alt="Unispace logo"
            src="/assets/images/unispace-logo.svg"
          />

          <TextContainer>
            <h1 bold color={PRIMARY_900} size="1.5rem">
              Unispace
            </h1>
          </TextContainer>
        </LogoContainer>

        <FlexBox column width="100%" rowGap="0.25rem">
          <NavItem>
            <FiMenu
              size="1.25rem"
              cursor="pointer"
              strokeWidth={1.5}
              onClick={toggleExpanded}
            />
          </NavItem>

          <Link href="/roster">
            <NavItem selected={isRosterPage}>
              <MdOutlineTableChart size="1.25rem" cursor="pointer" />

              <TextContainer>
                <Text>Roster</Text>
              </TextContainer>
            </NavItem>
          </Link>
        </FlexBox>

        <Divider />

        {isStudentPage && (
          <FlexBox column width="100%">
            <Link href={`/student/${id}/${year}/annual-plan`}>
              <NavItem padding="0.875rem 0.8rem" selected={isAnnualPlanPage}>
                <MdOutlineEventNote size="1.25rem" />

                <TextContainer>
                  <Text>Annual Plan</Text>
                </TextContainer>
              </NavItem>
            </Link>

            <Link href={`/student/${id}/${year}/${quarter}/quarterly-plan`}>
              <NavItem
                padding="0.875rem 0.8rem"
                selected={isQuarterlyReportPage}
              >
                <MdOutlineDonutSmall size="1.25rem" />

                <TextContainer>
                  <Text>Quarterly Report</Text>
                </TextContainer>
              </NavItem>
            </Link>

            <Link href={`/student/${id}/profile`}>
              <NavItem padding="0.875rem 0.8rem" selected={isProfilePage}>
                <MdPersonOutline size="1.25rem" />

                <TextContainer>
                  <Text>Profile</Text>
                </TextContainer>
              </NavItem>
            </Link>
          </FlexBox>
        )}
      </TopHalf>

      <BottomHalf>
        <NavItem padding="0.875rem 0.8rem" selected={false}>
          <InitialsContainer>
            <NameInitials name="Aryaman Rishabh" />
          </InitialsContainer>

          <TextContainer>
            <Text>Profile</Text>
          </TextContainer>
        </NavItem>

        <NavItem padding="0.875rem 0.8rem" selected={false}>
          <MdLogout size="1.25rem" />

          <TextContainer>
            <Text>Logout</Text>
          </TextContainer>
        </NavItem>
      </BottomHalf>
    </Wrapper>
  );
};

export default Sidebar;
