import styled from "styled-components";

import { BLACK } from "@constants/colors";

const Text = styled.span`
  letter-spacing: 0.1px;
  color: ${({ color }) => color};
  font-size: ${({ size }) => size};
  line-height: ${({ lineHeight }) => lineHeight};
  font-weight: ${({ bold }) => (bold ? "bold" : 500)};
`;

Text.defaultProps = {
  bold: false,
  color: BLACK,
  size: "1rem",
  lineHeight: 1,
};

export default Text;
