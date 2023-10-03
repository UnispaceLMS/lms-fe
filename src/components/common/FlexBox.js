import styled from "styled-components";

const FlexBox = styled.div`
  display: flex;
  width: ${({ width }) => width};
  cursor: ${({ cursor }) => cursor};
  margin: ${({ margin }) => margin};
  row-gap: ${({ rowGap }) => rowGap};
  align-items: ${({ align }) => align};
  padding: ${({ padding }) => padding};
  column-gap: ${({ colGap }) => colGap};
  justify-content: ${({ justify }) => justify};
  flex-direction: ${({ column }) => (column ? "column" : "row")};
`;

FlexBox.defaultProps = {
  rowGap: 0,
  colGap: 0,
  margin: 0,
  padding: 0,
  column: false,
  width: "auto",
  cursor: "auto",
  align: "stretch",
  justify: "flex-start",
};

export default FlexBox;
