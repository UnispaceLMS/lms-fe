import { useEffect } from "react";
import styled from "styled-components";

import FlexBox from "@common/FlexBox";

import { MODAL_BACKDROP } from "@constants/colors";

const Wrapper = styled(FlexBox)`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  align-items: center;
  justify-content: center;
  background-color: ${MODAL_BACKDROP};
`;

const ModalBackDrop = ({ children }) => {
  // to prevent background scrolling when a modal is open
  useEffect(() => {
    document.body.style.setProperty("overflow", "hidden");

    return () => document.body.style.removeProperty("overflow");
  }, []);

  return <Wrapper>{children}</Wrapper>;
};

export default ModalBackDrop;
