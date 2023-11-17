import { useRef, useState } from "react";
import Select from "react-select";
import styled, { css } from "styled-components";
import { FiPlus, FiTrash2 } from "react-icons/fi";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import Base from "@common/DropdownOptions/Base";
import { ChipOptions, ChipValues } from "@common/DropdownOptions/Chips";

import YearMonthPicker from "./YearMonthPicker";

import { statusOptions, statusStyles } from "@metadata/statusOptions";
import { GRAY_200, GRAY_50, GRAY_500, WHITE } from "@constants/colors";
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

const Wrapper = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
`;

const TableContainer = styled(FlexBox)`
  width: 100%;
`;

const TableOverflow = styled(FlexBox)`
  width: 100%;
  overflow: auto;
  max-width: 100%;
  flex-direction: column;
  border: 1px solid ${GRAY_200};
  border-radius: 0.5rem 0.5rem 0 0;
`;

const Table = styled.div`
  display: grid;
  min-width: 100%;
  overflow: hidden;
  grid-template-columns: 16% 10.5% 27.85% 17.25% 15.75% 12.65%;

  ${({ styles }) => styles}
`;

const TableCell = styled(FlexBox)`
  width: 100%;
  padding: 0.75rem;
  background-color: ${WHITE};
  border-top: 1px solid ${GRAY_200};
  border-right: 1px solid ${GRAY_200};
  justify-content: ${({ justify }) => justify || "space-between"};

  #delete {
    min-width: 1.25rem;
  }

  ${({ width }) =>
    width &&
    css`
      min-width: ${width};
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
    `}

  * {
    cursor: inherit;
  }
`;

const Area = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  font: inherit;
  font-size: 0.75rem;
  padding-top: 0.125rem;
  height: ${({ height }) => `${height}px`};
`;

const Input = styled.input`
  padding: 0;
  width: 100%;
  border: none;
  font: inherit;
  height: 1.25rem;
  font-size: 0.75rem;
`;

const TableHeader = ({ isQuarterlyPlan }) => (
  <TableContainer>
    <Table
      styles={css`
        border: none;
      `}
    >
      <TableCell header>
        <Text weight={500} color={GRAY_500} size="0.75rem">
          Goal
        </Text>
      </TableCell>

      <TableCell header>
        <Text weight={500} color={GRAY_500} size="0.75rem">
          Date
        </Text>
      </TableCell>

      <TableCell header>
        <Text weight={500} color={GRAY_500} size="0.75rem">
          Short Term Objective
        </Text>
      </TableCell>

      <TableCell header>
        <Text weight={500} color={GRAY_500} size="0.75rem">
          Assessment
        </Text>
      </TableCell>

      <TableCell header>
        <Text weight={500} color={GRAY_500} size="0.75rem">
          Schedule
        </Text>
      </TableCell>

      <TableCell header>
        <Text weight={500} color={GRAY_500} size="0.75rem">
          Criteria
        </Text>
      </TableCell>
    </Table>

    {isQuarterlyPlan && (
      <TableCell header width="22%">
        <Text weight={500} color={GRAY_500} size="0.75rem">
          Status
        </Text>
      </TableCell>
    )}

    {isQuarterlyPlan && (
      <TableCell header width="12.5%">
        <Text weight={500} color={GRAY_500} size="0.75rem">
          Status Notes
        </Text>
      </TableCell>
    )}

    <TableCell header width="6%" />
  </TableContainer>
);

const TableRow = ({
  i,
  entry,
  isGoalText,
  goalOptions,
  isQuarterlyPlan,
  handleDelete = () => {},
  handleDateInput = () => {},
  handleTextInput = () => {},
  handleSelectInput = () => {},
}) => {
  const areaRef1 = useRef(null);
  const areaRef2 = useRef(null);

  const [height1, setHeight1] = useState(areaRef1?.current?.scrollHeight);
  const [height2, setHeight2] = useState(areaRef1?.current?.scrollHeight);

  const {
    goal,
    date,
    status,
    criteria,
    frequency,
    assessment,
    statusNote,
    shortTermGoal,
  } = entry || {};

  const handleDateChange = date => handleDateInput(date, i);

  return (
    <TableContainer>
      <Table
        styles={css`
          border: none;
        `}
      >
        <TableCell>
          {isGoalText ? (
            <Input
              name="goal"
              value={goal}
              placeholder="Goal"
              onChange={e => handleTextInput(e, i)}
            />
          ) : (
            <Select
              value={goal}
              placeholder="Goal"
              menuPosition="fixed"
              menuShouldBlockScroll
              options={goalOptions}
              styles={customSelectStyles}
              components={{ Option: Base }}
              onChange={option => handleSelectInput(option, "goal", i)}
            />
          )}
        </TableCell>

        <TableCell>
          <YearMonthPicker date={date} handleChange={handleDateChange} />
        </TableCell>

        <TableCell>
          <Area
            rows={1}
            ref={areaRef1}
            height={height1}
            name="shortTermGoal"
            value={shortTermGoal}
            placeholder="Short Term Objective"
            onChange={e => {
              handleTextInput(e, i);
              setHeight1(areaRef1?.current?.scrollHeight);
            }}
          />
        </TableCell>

        <TableCell>
          <Select
            isSearchable={false}
            value={assessment}
            menuPosition="fixed"
            menuShouldBlockScroll
            placeholder="Assessment"
            options={assessmentOptions}
            styles={{
              ...customSelectStyles,
              valueContainer: baseStyles => ({
                ...baseStyles,
                padding: 0,
                'input[aria-readonly="true"]': {
                  position: "absolute",
                },
              }),
            }}
            onChange={option => handleSelectInput(option, "assessment", i)}
            components={{
              SingleValue: ({ data }, props) => (
                <ChipValues
                  data={data}
                  optionStyles={assessmentStyles}
                  {...props}
                />
              ),
              Option: ({ value, label, innerRef, isSelected, innerProps }) => (
                <ChipOptions
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
            value={frequency}
            isSearchable={false}
            menuPosition="fixed"
            menuShouldBlockScroll
            placeholder="Frequency"
            options={frequencyOptions}
            styles={{
              ...customSelectStyles,
              valueContainer: baseStyles => ({
                ...baseStyles,
                padding: 0,
                'input[aria-readonly="true"]': {
                  position: "absolute",
                },
              }),
            }}
            onChange={option => handleSelectInput(option, "frequency", i)}
            components={{
              SingleValue: ({ data }, props) => (
                <ChipValues
                  data={data}
                  optionStyles={frequencyStyles}
                  {...props}
                />
              ),
              Option: ({ value, label, innerRef, isSelected, innerProps }) => (
                <ChipOptions
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
          <Input
            name="criteria"
            value={criteria}
            placeholder="Criteria"
            onChange={e => handleTextInput(e, i)}
          />
        </TableCell>
      </Table>

      {isQuarterlyPlan && (
        <TableCell width="22%">
          <Select
            value={status}
            isSearchable={false}
            menuPosition="fixed"
            menuShouldBlockScroll
            placeholder="Status"
            options={statusOptions}
            styles={{
              ...customSelectStyles,
              valueContainer: baseStyles => ({
                ...baseStyles,
                padding: 0,
                'input[aria-readonly="true"]': {
                  position: "absolute",
                },
              }),
            }}
            onChange={option => handleSelectInput(option, "status", i)}
            components={{
              SingleValue: ({ data }, props) => (
                <ChipValues
                  data={data}
                  optionStyles={statusStyles}
                  {...props}
                />
              ),
              Option: ({ value, label, innerRef, isSelected, innerProps }) => (
                <ChipOptions
                  value={value}
                  label={label}
                  innerRef={innerRef}
                  isSelected={isSelected}
                  innerProps={innerProps}
                  optionStyles={statusStyles}
                />
              ),
            }}
          />
        </TableCell>
      )}

      {isQuarterlyPlan && (
        <TableCell width="12.5%">
          <Area
            rows={1}
            ref={areaRef2}
            height={height2}
            name="statusNote"
            value={statusNote}
            placeholder="Status Notes"
            onChange={e => {
              handleTextInput(e, i);
              setHeight2(areaRef2?.current?.scrollHeight);
            }}
          />
        </TableCell>
      )}

      <TableCell
        width="6%"
        align="center"
        justify="center"
        cursor="pointer"
        onClick={() => handleDelete(i)}
      >
        <FiTrash2
          id="delete"
          size="1.25rem"
          color={GRAY_500}
          strokeWidth={2.25}
        />
      </TableCell>
    </TableContainer>
  );
};

const TableFooter = ({ onClick }) => (
  <Table
    styles={css`
      border: 1px solid ${GRAY_200};
      border-top: none;
      border-radius: 0 0 0.5rem 0.5rem;
    `}
  >
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
  </Table>
);

const EntryTable = ({
  isGoalText,
  goalOptions,
  tableEntries,
  setTableEntries,
  isQuarterlyPlan,
  defaultTableEntry,
}) => {
  const handleTextInput = (e, i) => {
    try {
      const { name, value } = e.target;
      const duplicateEntry = { ...tableEntries?.[i], [name]: value };

      const entries = [...tableEntries];
      entries[i] = duplicateEntry;

      setTableEntries(entries);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateInput = (date, i) => {
    try {
      const duplicateEntry = { ...tableEntries?.[i], date };

      const entries = [...tableEntries];
      entries[i] = duplicateEntry;

      setTableEntries(entries);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectInput = (option, field, i) => {
    try {
      const duplicateEntry = { ...tableEntries?.[i], [field]: option };

      const entries = [...tableEntries];
      entries[i] = duplicateEntry;

      setTableEntries(entries);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = i => {
    try {
      const tempEntries = [...tableEntries];

      if (i > -1) tempEntries?.splice(i, 1);

      setTableEntries(tempEntries);
    } catch (error) {
      console.log(error);
    }
  };

  const incrementRows = () => {
    try {
      const entries = [...tableEntries, defaultTableEntry];

      setTableEntries(entries);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <TableOverflow>
        <TableHeader isQuarterlyPlan={isQuarterlyPlan} />

        {tableEntries?.map((entry, i) => (
          <TableRow
            i={i}
            key={i}
            entry={entry}
            isGoalText={isGoalText}
            goalOptions={goalOptions}
            handleDelete={handleDelete}
            isQuarterlyPlan={isQuarterlyPlan}
            handleDateInput={handleDateInput}
            handleTextInput={handleTextInput}
            handleSelectInput={handleSelectInput}
          />
        ))}
      </TableOverflow>

      <TableFooter onClick={incrementRows} />
    </Wrapper>
  );
};

export default EntryTable;
