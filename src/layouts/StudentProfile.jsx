import { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Loader from "@common/Loader";
import FlexBox from "@common/FlexBox";

import { getStudentProfile } from "@redux/Slices/studentSlice";

const PageWrapper = styled(FlexBox)`
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const StudentProfile = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const student = useSelector(state => state?.student?.profile);
  const studentLoading = useSelector(state => state?.student?.loading);

  useEffect(() => {
    if (router.isReady) {
      const id = router?.query?.id;

      if (id) {
        if (!student || (student && parseInt(student?.id) !== parseInt(id))) {
          dispatch(getStudentProfile(id));
        }
      }
    }
  }, [router.isReady]);

  if (!student || studentLoading) {
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    );
  }

  return children;
};

export default StudentProfile;
