import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Loader from "@common/Loader";
import FlexBox from "@common/FlexBox";

import { validateToken } from "@redux/Slices/authSlice";
import { clearStudentData } from "@redux/Slices/studentSlice";

const PageWrapper = styled(FlexBox)`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const HandleAuth = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(state => state?.auth?.user);
  const student = useSelector(state => state?.student?.profile);
  const authLoading = useSelector(state => state?.auth?.loading);

  const isLoginPage = router?.pathname?.includes("/login");
  const isStudentPage = router?.pathname?.includes("/student");

  useEffect(() => {
    if (!isStudentPage && student) {
      dispatch(clearStudentData());
    }
  }, [router?.pathname]);

  useEffect(() => {
    // user will be let into the protected paths if token exists in storage
    // if token exists we will validate the token to populate user info
    // since user's info could be cleared when the browser was closed

    if (!user && !isLoginPage) {
      dispatch(validateToken());
    }
  }, [user]);

  if (authLoading && !isLoginPage) {
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    );
  }

  return children;
};

export default HandleAuth;
