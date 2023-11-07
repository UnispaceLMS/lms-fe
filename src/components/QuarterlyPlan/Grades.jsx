import { useState } from "react";
import styled, { css } from "styled-components";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextArea from "@common/TextArea";
import { PrimaryButton } from "@common/Buttons";

import {
  WHITE,
  GRAY_50,
  GRAY_200,
  GRAY_300,
  GRAY_500,
  GRAY_700,
} from "@constants/colors";

const Container = styled(FlexBox)`
  padding: 1.5rem;
  row-gap: 0.75rem;
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_200};
`;

const Table = styled.div`
  width: 36rem;
  display: grid;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid ${GRAY_200};
  grid-template-columns: 52% 24% 24%;
`;

const TableCell = styled(FlexBox)`
  width: 100%;
  padding: 0.75rem;
  background-color: ${WHITE};
  border-top: 1px solid ${GRAY_200};
  border-right: 1px solid ${GRAY_200};

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
      align-items: center;
      justify-content: flex-end;
      background-color: ${GRAY_50};
      border-top: 1px solid ${GRAY_200};
    `}

  input {
    width: 100%;
    border: none;
    font: inherit;
    color: ${GRAY_700};
    font-size: 0.875rem;

    &::placeholder {
      color: ${GRAY_300};
    }
  }
`;

const TableHeader = () => (
  <>
    <TableCell header>
      <Text weight={500} color={GRAY_500} size="0.75rem">
        Category
      </Text>
    </TableCell>
    <TableCell header>
      <Text weight={500} color={GRAY_500} size="0.75rem">
        Score
      </Text>
    </TableCell>
    <TableCell header>
      <Text weight={500} color={GRAY_500} size="0.75rem">
        Comments
      </Text>
    </TableCell>
  </>
);

const TableRow = ({
  score,
  category,
  comments,
  assessment,
  handleChange = () => {},
}) => (
  <>
    <TableCell>
      <Text color={GRAY_700} size="0.875rem">
        {category}
      </Text>
    </TableCell>
    <TableCell>
      <input
        type="number"
        name="score"
        value={score}
        id={assessment}
        placeholder="Enter"
        onChange={handleChange}
      />
    </TableCell>
    <TableCell>
      <input
        type="text"
        name="comments"
        id={assessment}
        value={comments}
        placeholder="Enter"
        onChange={handleChange}
      />
    </TableCell>
  </>
);

const TableFooter = () => (
  <>
    <TableCell footer />
    <TableCell footer />
    <TableCell footer />
  </>
);

const Grades = () => {
  const [assessments, setAssessments] = useState({
    healthWellness: {
      label: "Health & Wellness",
      score: "",
      comments: "",
    },
    personalManagement: {
      label: "Personal Management",
      score: "",
      comments: "",
    },
    homeManagement: {
      label: "Home Management",
      score: "",
      comments: "",
    },
    safety: {
      label: "Safety",
      score: "",
      comments: "",
    },
    transportation: {
      label: "Transportation",
      score: "",
      comments: "",
    },
    healthyRelationship: {
      label: "Healthy Relationship",
      score: "",
      comments: "",
    },
    moneyManagement: {
      label: "Money Management",
      score: "",
      comments: "",
    },
    employment: {
      label: "Employment",
      score: "",
      comments: "",
    },
    misc: {
      label: "Misc",
      score: "",
      comments: "",
    },
  });

  const addAssessmentScore = e => {
    try {
      const { id, name, value } = e.target;

      setAssessments(prev => ({
        ...prev,
        [id]: {
          ...assessments?.[id],
          [name]: value,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FlexBox column rowGap="1.5rem">
      <Text size="1.125rem" color={GRAY_700}>
        Grades
      </Text>

      <Container>
        <Text size="0.875rem">Student Strengths</Text>
        <TextArea rows={1} placeholder="Enter" />
      </Container>

      <FlexBox column rowGap="0.75rem">
        <Table>
          <TableHeader />

          {Object?.keys(assessments)?.map(key => {
            const { label, score, comments } = assessments?.[key];

            return (
              <TableRow
                key={key}
                score={score}
                assessment={key}
                category={label}
                comments={comments}
                handleChange={addAssessmentScore}
              />
            );
          })}

          <TableFooter />
        </Table>

        <PrimaryButton>Save</PrimaryButton>
      </FlexBox>
    </FlexBox>
  );
};

export default Grades;
