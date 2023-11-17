import { FiPlus } from "react-icons/fi";
import styled, { css } from "styled-components";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";

import {
  WHITE,
  GRAY_50,
  GRAY_200,
  GRAY_300,
  GRAY_500,
  GRAY_700,
} from "@constants/colors";

const Table = styled.div`
  display: grid;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid ${GRAY_200};

  ${({ columns }) => css`
    width: ${`calc(${columns} * 18.75rem)`};
    grid-template-columns: ${`repeat(${columns}, 1fr)`};
  `}
`;

const TableCell = styled(FlexBox)`
  width: 100%;
  padding: 0.75rem;
  background-color: ${WHITE};
  border-top: 1px solid ${GRAY_200};
  border-right: 1px solid ${GRAY_200};

  input {
    width: 100%;
    border: none;
    color: ${GRAY_700};

    &::placeholder {
      color: ${GRAY_300};
    }
  }

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

const TableHeader = ({ columns }) => (
  <>
    {columns?.map(col => (
      <TableCell header key={col}>
        <Text size="0.75rem" weight={500} color={GRAY_500}>
          {col}
        </Text>
      </TableCell>
    ))}
  </>
);

const TableRow = ({ index, entry, handleChange }) => (
  <>
    {Object?.entries(entry)?.map((e, i) => {
      const entryKey = e?.[0];
      const entryValue = e?.[1];

      return (
        <TableCell key={`${index}-${i}`}>
          <input
            name={entryKey}
            value={entryValue}
            placeholder="Type Here"
            onChange={e => handleChange(e, index)}
          />
        </TableCell>
      );
    })}
  </>
);

const TableFooter = ({ columns, onClick }) => (
  <>
    {columns?.map((_, i) => {
      if (i < columns?.length - 1) return <TableCell footer key={i} />;

      return (
        <TableCell footer key={i}>
          <FlexBox
            align="center"
            colGap="0.5rem"
            cursor="pointer"
            onClick={onClick}
          >
            <FiPlus color={GRAY_500} />
            <Text size="0.75rem" color={GRAY_500} weight={500}>
              Add
            </Text>
          </FlexBox>
        </TableCell>
      );
    })}
  </>
);

// columns:
// array of Strings
// ["Column-1", "Column-2"]

// entries:
// array of Objects
// [{key: "", value: ""}]

// handleChange:
// accepts event and index
// alters entry at the index

const MultipleEntryTable = ({
  columns,
  entries,
  addEntry = () => {},
  handleChange = () => {},
}) => {
  return (
    <Table columns={columns?.length}>
      <TableHeader columns={columns} />

      {entries?.map((entry, i) => (
        <TableRow key={i} index={i} entry={entry} handleChange={handleChange} />
      ))}

      <TableFooter columns={columns} onClick={addEntry} />
    </Table>
  );
};

export default MultipleEntryTable;
