import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

import FlexBox from "@common/FlexBox";
import Sidebar from "@components/Sidebar";

const Wrapper = styled(FlexBox)`
  width: 100vw;
  height: 100vh;
  overflow: auto;
  position: relative;
  align-items: flex-end;
  flex-direction: column;
`;

const MainContainer = styled(FlexBox)`
  flex: 1;
  overflow: auto;
  width: calc(100vw - 4rem);
  transition: width 250ms linear;

  ${({ sidebarExpanded }) =>
    sidebarExpanded &&
    css`
      width: calc(100vw - 12.75rem);
    `}
`;

const DashboardLayout = ({ children }) => {
  const sidebarExpanded = useSelector((state) => state?.sidebar?.expanded);

  return (
    <Wrapper>
      <Sidebar />
      <MainContainer sidebarExpanded={sidebarExpanded}>
        {children}
      </MainContainer>
    </Wrapper>
  );
};

export default DashboardLayout;
