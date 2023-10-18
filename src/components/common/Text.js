import styled from "styled-components";

import { BLACK } from "@constants/colors";

const Text = styled.span`
  letter-spacing: 0.1px;
  color: ${({ color }) => color};
  font-size: ${({ size }) => size};
  text-align: ${({ align }) => align};
  font-weight: ${({ bold, weight }) => weight || (bold ? "bold" : 500)};
`;

Text.defaultProps = {
  bold: false,
  color: BLACK,
  size: "1rem",
  align: "left",
};

export default Text;
