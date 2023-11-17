import styled from "styled-components";

import { GRAY_800 } from "@constants/colors";

const Text = styled.span`
  letter-spacing: 0.1px;
  color: ${({ color }) => color};
  font-size: ${({ size }) => size};
  text-align: ${({ align }) => align};
  text-transform: ${({ transform }) => transform};
  font-weight: ${({ bold, weight }) => weight || (bold ? "bold" : 400)};
`;

Text.defaultProps = {
  bold: false,
  size: "1rem",
  align: "left",
  color: GRAY_800,
  transform: "none",
};

export default Text;
