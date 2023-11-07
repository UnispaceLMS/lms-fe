import { useEffect, useState } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { FiCheck, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch, IoAddCircle } from "react-icons/io5";

import Text from "@common/Text";
import Loader from "@common/Loader";
import FlexBox from "@common/FlexBox";
import Paginator from "@common/Paginator";
import { ViewButton } from "@common/Buttons";
import ModalBackDrop from "@common/ModalBackDrop";

import CreateStudent from "./CreateStudent";

import {
  WHITE,
  GRAY_100,
  GRAY_500,
  ERROR_600,
  PRIMARY_600,
  SUCCESS_600,
} from "@constants/colors";
import { buildName } from "@utils/helpers";
import { deleteStudents, fetchRoster } from "@redux/Slices/rosterSlice";

const Wrapper = styled(FlexBox)`
  flex: 1;
  overflow: auto;
  max-width: 100%;
  position: relative;
  align-items: center;
  padding: 3rem 0 2rem;
  flex-direction: column;
`;

const Container = styled(FlexBox)`
  flex: 1;
  width: 95%;
  row-gap: 1.5rem;
  flex-direction: column;
`;

const Actions = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;
`;

const SearchInput = styled(FlexBox)`
  width: 15.625rem;
  align-items: center;
  column-gap: 0.375rem;
  border-radius: 0.25rem;
  padding: 0.625rem 0.75rem;
  border: 1px solid ${PRIMARY_600};

  input {
    flex: 1;
    padding: 0;
    border: none;
  }
`;

const ExportExcel = styled(FlexBox)`
  cursor: pointer;
  column-gap: 0.5rem;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0.625rem 1.25rem;
  border: 1px solid ${SUCCESS_600};
`;

const NewStudent = styled(FlexBox)`
  cursor: pointer;
  column-gap: 0.5rem;
  align-items: center;
  border-radius: 0.25rem;
  padding: 0.625rem 1.25rem;
  background-color: ${PRIMARY_600};
`;

const LoaderWrapper = styled(FlexBox)`
  flex: 1;
`;

const Table = styled.div`
  width: 100%;
  display: grid;
  overflow: hidden;
  row-gap: 0.75rem;
  border-radius: 0.5rem;
  grid-template-columns: 9% 28.8% 27% 21.2% 14%;
`;

const TextContainer = styled(FlexBox)`
  width: 100%;
  padding: 0.75rem;
  align-items: center;

  ${({ head }) =>
    head &&
    css`
      background-color: ${GRAY_100};
    `}
`;

const CheckboxContainer = styled(FlexBox)`
  width: 100%;
  padding: 0.75rem;
  align-items: center;
  justify-content: center;

  ${({ head }) =>
    head &&
    css`
      background-color: ${GRAY_100};
    `}
`;

const Checkbox = styled(FlexBox)`
  cursor: pointer;
  min-width: 1.25rem;
  min-height: 1.25rem;
  align-items: center;
  border-radius: 0.25rem;
  justify-content: center;
  background-color: ${GRAY_100};
  border: 0.8px solid ${GRAY_500};
  transition: all 250ms ease-in-out;

  svg {
    color: ${GRAY_100};
    font-size: 0.75rem;
  }

  ${({ selected }) =>
    selected &&
    css`
      border-color: ${PRIMARY_600};
      background-color: ${PRIMARY_600};

      svg {
        color: ${WHITE};
      }
    `}
`;

const DeleteContainer = styled(FlexBox)`
  opacity: 0;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  align-items: center;
  pointer-events: none;
  border-radius: 0.5rem;
  justify-content: center;
  border: 1.5px solid ${ERROR_600};
  transition: opacity 250ms ease-in-out;

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      pointer-events: all;
    `}
`;

const TableHeader = ({ isSelected, handleSelect = () => {} }) => (
  <>
    <CheckboxContainer head>
      <Checkbox selected={isSelected} onClick={handleSelect}>
        <FiCheck />
      </Checkbox>
    </CheckboxContainer>
    <TextContainer head>
      <Text bold size="0.75rem">
        Student Name
      </Text>
    </TextContainer>
    <TextContainer head>
      <Text bold size="0.75rem">
        Program
      </Text>
    </TextContainer>
    <TextContainer head>
      <Text bold size="0.75rem">
        Primary Staff
      </Text>
    </TextContainer>
    <TextContainer head justify="center">
      <Text bold size="0.75rem">
        Action
      </Text>
    </TextContainer>
  </>
);

const StudentEntry = ({
  id,
  name,
  program,
  isSelected,
  handleSelect = () => {},
}) => (
  <>
    <CheckboxContainer>
      <Checkbox selected={isSelected} onClick={handleSelect}>
        <FiCheck />
      </Checkbox>
    </CheckboxContainer>
    <TextContainer>
      <Text size="0.75rem">{name}</Text>
    </TextContainer>
    <TextContainer>
      <Text size="0.75rem">Program</Text>
    </TextContainer>
    <TextContainer>
      <Text size="0.75rem">Primary Staff</Text>
    </TextContainer>
    <TextContainer justify="center">
      <Link href={`/student/${id}/profile`}>
        <ViewButton />
      </Link>
    </TextContainer>
  </>
);

const Roster = () => {
  const dispatch = useDispatch();
  const roster = useSelector(state => state?.roster?.list);
  const rosterLoading = useSelector(state => state?.roster?.loading);

  const [pageNumber, setPageNumber] = useState(1);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showCreateStudentModal, setShowCreateStudentModal] = useState(false);

  useEffect(() => {
    if (!roster) dispatch(fetchRoster());
  }, [roster]);

  const toggleCreateStudentModal = () =>
    setShowCreateStudentModal(prev => !prev);

  const handleSelect = id => {
    try {
      let studentsArr = [...selectedStudents];

      if (studentsArr?.includes(id)) {
        const index = studentsArr?.findIndex(i => i === id);
        studentsArr?.splice(index, 1);
      } else {
        studentsArr = [...studentsArr, id];
      }

      setSelectedStudents(studentsArr);
    } catch (error) {
      console.log(error, "Error selecting students");
    }
  };

  const selectDeselectAll = () => {
    try {
      let studentArr;

      if (selectedStudents?.length === roster?.length) {
        studentArr = [];
      } else {
        studentArr = roster?.map(({ id }) => id);
      }

      setSelectedStudents(studentArr);
    } catch (error) {
      console.log(error, "Error in selecting all students");
    }
  };

  const handleDelete = () => {
    dispatch(deleteStudents(selectedStudents));
    setSelectedStudents([]);
  };

  const handlePageChange = page => {
    if (page < 1) {
      setPageNumber(1);
    }
    // TODO total pages
    else if (page > 10) {
      setPageNumber(10);
    } else {
      setPageNumber(page);
    }
  };

  return (
    <Wrapper>
      {showCreateStudentModal && (
        <ModalBackDrop>
          <CreateStudent toggleModal={toggleCreateStudentModal} />
        </ModalBackDrop>
      )}

      <Container>
        <Text bold>Student Roster</Text>

        <Actions>
          <DeleteContainer
            onClick={handleDelete}
            visible={!!selectedStudents?.length}
          >
            <FiTrash2 size="1.25rem" color={ERROR_600} />
          </DeleteContainer>

          <FlexBox colGap="0.75rem">
            <SearchInput>
              <IoSearch size="0.875rem" />
              <input />
            </SearchInput>

            <ExportExcel>
              <Text weight={600} color={SUCCESS_600} size="0.625rem">
                Export in Excel
              </Text>
            </ExportExcel>

            <NewStudent onClick={toggleCreateStudentModal}>
              <Text color={WHITE} size="0.625rem">
                New Student
              </Text>
              <IoAddCircle color={WHITE} size="0.875rem" />
            </NewStudent>
          </FlexBox>
        </Actions>

        {rosterLoading && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}

        {!!roster?.length && !rosterLoading && (
          <Table>
            <TableHeader
              handleSelect={selectDeselectAll}
              isSelected={selectedStudents?.length === roster?.length}
            />

            {roster?.map(({ id, firstName, middleName, lastName, program }) => {
              const name = buildName(firstName, middleName, lastName);

              return (
                <StudentEntry
                  id={id}
                  key={id}
                  name={name}
                  program={program}
                  handleSelect={() => handleSelect(id)}
                  isSelected={selectedStudents?.includes(id)}
                />
              );
            })}
          </Table>
        )}

        <Paginator currentPage={pageNumber} handlePageChange={setPageNumber} />
      </Container>
    </Wrapper>
  );
};

export default Roster;
