import { useRef, useState } from "react";
import Select from "react-select";
import { FiPlus } from "react-icons/fi";
import styled, { css } from "styled-components";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextArea from "@common/TextArea";
import { PrimaryButton } from "@common/Buttons";
import Base from "@common/DropdownOptions/Base";
import Chips from "@common/DropdownOptions/Chips";

import { goalOptions } from "@metadata/goals";
import { WHITE, GRAY_200, GRAY_50, GRAY_500 } from "@constants/colors";
import { frequencyOptions, frequencyStyles } from "@metadata/frequencies";
import { assessmentOptions, assessmentStyles } from "@metadata/assessments";

const customSelectStyles = {
  container: baseStyles => ({
    ...baseStyles,
    width: "100%",
  }),
  control: baseStyles => ({
    ...baseStyles,
    border: "none",
    boxShadow: "none",
    minHeight: "unset",
    fontSize: "0.75rem",
  }),
  valueContainer: baseStyles => ({
    ...baseStyles,
    padding: 0,
  }),
  input: baseStyles => ({
    ...baseStyles,
    margin: 0,
    padding: 0,
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: baseStyles => ({ ...baseStyles, padding: 0 }),
};

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
  justify-content: space-between;
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

  * {
    cursor: inherit;
  }
`;

const ObjectiveText = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  font: inherit;
  font-size: 0.75rem;
  padding-top: 0.125rem;
  height: ${({ height }) => `${height}px`};
`;

const CriteriaText = styled.input`
  padding: 0;
  width: 100%;
  border: none;
  font: inherit;
  height: 1.25rem;
  font-size: 0.75rem;
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

const TableRow = () => {
  const areaRef = useRef(null);
  const [height, setHeight] = useState(areaRef?.current?.scrollHeight);

  return (
    <>
      <TableCell>
        <Select
          placeholder="Goal"
          menuPosition="fixed"
          options={goalOptions}
          menuShouldBlockScroll
          styles={customSelectStyles}
          components={{ Option: Base }}
        />
      </TableCell>

      <TableCell>
        <Select
          placeholder="Date"
          menuPosition="fixed"
          menuShouldBlockScroll
          styles={customSelectStyles}
        />
      </TableCell>

      <TableCell>
        <ObjectiveText
          rows={1}
          ref={areaRef}
          height={height}
          placeholder="Short Term Objective"
          onChange={e => {
            setHeight(areaRef?.current?.scrollHeight);
          }}
        />
      </TableCell>

      <TableCell>
        <Select
          menuPosition="fixed"
          menuShouldBlockScroll
          placeholder="Assessment"
          options={assessmentOptions}
          styles={customSelectStyles}
          components={{
            Option: ({ value, label, innerRef, isSelected, innerProps }) => (
              <Chips
                value={value}
                label={label}
                innerRef={innerRef}
                isSelected={isSelected}
                innerProps={innerProps}
                optionStyles={assessmentStyles}
              />
            ),
          }}
        />
      </TableCell>

      <TableCell>
        <Select
          id="freq"
          menuPosition="fixed"
          menuShouldBlockScroll
          placeholder="Frequency"
          options={frequencyOptions}
          styles={customSelectStyles}
          components={{
            Option: ({ value, label, innerRef, isSelected, innerProps }) => (
              <Chips
                value={value}
                label={label}
                innerRef={innerRef}
                isSelected={isSelected}
                innerProps={innerProps}
                optionStyles={frequencyStyles}
              />
            ),
          }}
        />
      </TableCell>

      <TableCell>
        <CriteriaText placeholder="Criteria" />
      </TableCell>
    </>
  );
};

const TableFooter = ({ onClick }) => (
  <>
    <TableCell footer />

    <TableCell footer />

    <TableCell footer />

    <TableCell footer />

    <TableCell footer />

    <TableCell footer cursor="pointer" onClick={onClick}>
      <FlexBox align="center" colGap="0.5rem">
        <FiPlus color={GRAY_500} />
        <Text weight={500} size="0.875rem" color={GRAY_500}>
          Add
        </Text>
      </FlexBox>
    </TableCell>
  </>
);

const HealthWellness = () => {
  const [rows, setRows] = useState(1);

  const incrementRows = () => setRows(prev => prev + 1);

  return (
    <FlexBox column width="100%" rowGap="1.5rem">
      <Text weight={500} size="1.125rem">
        Goals
      </Text>

      <Container>
        <Text weight={500} size="1.125rem">
          Health & Wellness
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
  );
};

export default HealthWellness;
