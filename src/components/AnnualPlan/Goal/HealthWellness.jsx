import { useState } from "react";
import styled, { css } from "styled-components";

import AnnualPlanLayout from "@/layouts/AnnualPlanLayout";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextArea from "@common/TextArea";
import { PrimaryButton } from "@common/Buttons";

import { WHITE, GRAY_200, GRAY_50, GRAY_500 } from "@constants/colors";

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  row-gap: 1.5rem;
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_200};
`;

const Table = styled.div`
  width: 100%;
  display: grid;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid ${GRAY_200};
  grid-template-columns: 16% 10.5% 27.85% 17.25% 15.75% 12.65%;
`;

const TableCell = styled(FlexBox)`
  width: 100%;
  padding: 0.75rem;
  background-color: ${WHITE};
  border-top: 1px solid ${GRAY_200};
  border-right: 1px solid ${GRAY_200};

  ${({ lastInRow }) =>
    lastInRow &&
    css`
      border-right: none;
    `}

  ${({ header }) =>
    header &&
    css`
      border: none;
      background-color: ${GRAY_50};
    `}

  ${({ footer }) =>
    footer &&
    css`
      border: none;
      justify-content: flex-end;
      background-color: ${GRAY_50};
      border-top: 1px solid ${GRAY_200};
    `}
`;

const TableHeader = () => (
  <>
    <TableCell header>
      <Text weight={500} size="0.875rem">
        Goal
      </Text>
    </TableCell>

    <TableCell header>
      <Text weight={500} size="0.875rem">
        Date
      </Text>
    </TableCell>

    <TableCell header>
      <Text weight={500} size="0.875rem">
        Short Term Objective
      </Text>
    </TableCell>

    <TableCell header>
      <Text weight={500} size="0.875rem">
        Assessment
      </Text>
    </TableCell>

    <TableCell header>
      <Text weight={500} size="0.875rem">
        Schedule
      </Text>
    </TableCell>

    <TableCell header>
      <Text weight={500} size="0.875rem">
        Criteria
      </Text>
    </TableCell>
  </>
);

const TableRow = () => (
  <>
    <TableCell>
      <Text color={GRAY_500} size="0.75rem">
        Goal
      </Text>
    </TableCell>

    <TableCell>
      <Text color={GRAY_500} size="0.75rem">
        Date
      </Text>
    </TableCell>

    <TableCell>
      <Text color={GRAY_500} size="0.75rem">
        Short Term Objective
      </Text>
    </TableCell>

    <TableCell>
      <Text color={GRAY_500} size="0.75rem">
        Assessment
      </Text>
    </TableCell>

    <TableCell>
      <Text color={GRAY_500} size="0.75rem">
        Schedule
      </Text>
    </TableCell>

    <TableCell>
      <Text color={GRAY_500} size="0.75rem">
        Criteria
      </Text>
    </TableCell>
  </>
);

const TableFooter = ({ onClick }) => (
  <>
    <TableCell footer />

    <TableCell footer />

    <TableCell footer />

    <TableCell footer />

    <TableCell footer />

    <TableCell footer cursor="pointer" onClick={onClick}>
      <Text weight={500} size="0.875rem">
        Add
      </Text>
    </TableCell>
  </>
);

const HealthWellness = () => {
  const [rows, setRows] = useState(1);

  const incrementRows = () => setRows(prev => prev + 1);

  return (
    <AnnualPlanLayout>
      <FlexBox column width="100%" rowGap="1.5rem">
        <Text weight={500} size="1.125rem">
          Goals
        </Text>

        <Container>
          <Text weight={500} size="1.125rem">
            Goals
          </Text>

          <FlexBox column rowGap="0.75rem">
            <Text weight={500} size="0.875rem">
              Annual Goal
            </Text>
            <TextArea rows={1} placeholder="Enter" />
          </FlexBox>
        </Container>

        <FlexBox column rowGap="0.75rem" align="flex-end">
          <Table>
            <TableHeader />

            {new Array(rows).fill(1).map(i => (
              <TableRow key={i} />
            ))}

            <TableFooter onClick={incrementRows} />
          </Table>

          <PrimaryButton>Save</PrimaryButton>
        </FlexBox>
      </FlexBox>
    </AnnualPlanLayout>
  );
};

export default HealthWellness;
