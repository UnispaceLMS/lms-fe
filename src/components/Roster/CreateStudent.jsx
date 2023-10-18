import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { IoClose } from "react-icons/io5";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import { PrimaryButton, SecondaryButton } from "@common/Buttons";

import urls from "@/urls";
import axiosInstance from "@/axiosInstance";

import { GRAY_300, WHITE } from "@/constants/colors";

const Wrapper = styled(FlexBox)`
  width: 47.2%;
  max-width: 32rem;
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_300};
`;

const Header = styled(FlexBox)`
  padding: 1rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${GRAY_300};
`;

const Body = styled(FlexBox)`
  padding: 1rem;
  row-gap: 1rem;
  flex-direction: column;
`;

const Input = styled.input`
  width: 51%;
  max-width: 16rem;
  padding: 0.875rem;
  border-radius: 0.625rem;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_300};
`;

const Footer = styled(FlexBox)`
  padding: 1rem;
  column-gap: 1rem;
  justify-content: flex-end;
  border-top: 1px solid ${GRAY_300};
`;

const CreateStudent = ({ toggleModal }) => {
  const router = useRouter();
  const [studentDetails, setStudentDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    program: "",
  });

  const { firstName, middleName, lastName, program } = studentDetails;

  const handleInput = e => {
    try {
      const { name, value } = e.target;

      setStudentDetails(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const createStudent = async () => {
    try {
      const res = await axiosInstance.post(urls.studentCreateUpdate, {
        firstName,
        middleName,
        lastName,
      });
      const studentID = res?.data?.id;

      if (studentID)
        router.push(`/student/${studentID}/profile/personal-information`);
    } catch (error) {
      console.log("Error in creating student", error);
    }
  };

  return (
    <Wrapper>
      <Header>
        <Text bold size="1.125rem">
          Add New Student
        </Text>
        <IoClose onClick={toggleModal} cursor="pointer" strokeWidth={3} />
      </Header>

      <Body>
        <FlexBox width="100%" align="center" justify="space-between">
          <Text size="0.875rem">Student First Name</Text>
          <Input
            name="firstName"
            value={firstName}
            onChange={handleInput}
            placeholder="Enter First Name"
          />
        </FlexBox>

        <FlexBox width="100%" align="center" justify="space-between">
          <Text size="0.875rem">Student Middle Name</Text>
          <Input
            name="middleName"
            value={middleName}
            onChange={handleInput}
            placeholder="Enter Middle Name"
          />
        </FlexBox>

        <FlexBox width="100%" align="center" justify="space-between">
          <Text size="0.875rem">Student Last Name</Text>
          <Input
            name="lastName"
            value={lastName}
            onChange={handleInput}
            placeholder="Enter Last Name"
          />
        </FlexBox>

        <FlexBox>
          <Text size="0.875rem">Program</Text>
        </FlexBox>
      </Body>

      <Footer>
        <PrimaryButton
          onClick={createStudent}
          disabled={!firstName || !lastName}
        >
          Create
        </PrimaryButton>
        <SecondaryButton onClick={toggleModal}>Cancel</SecondaryButton>
      </Footer>
    </Wrapper>
  );
};

export default CreateStudent;
