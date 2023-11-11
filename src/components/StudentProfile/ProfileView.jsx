import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { FiBell, FiUser, FiEdit2, FiClipboard } from "react-icons/fi";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";

import {
  WHITE,
  GRAY_300,
  GRAY_600,
  GRAY_700,
  PRIMARY_500,
} from "@constants/colors";
import { buildName } from "@utils/helpers";

const Wrapper = styled(FlexBox)`
  width: 100%;
  overflow: auto;
  row-gap: 3.5rem;
  max-height: 100vh;
  padding: 5.5rem 4.5rem;
  flex-direction: column;
`;

const ProfileCard = styled(FlexBox)`
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px solid ${GRAY_300};
  justify-content: space-between;
`;

const LabelAndText = styled(FlexBox)`
  row-gap: 0.25rem;
  flex-direction: column;
`;

const StudentLHS = styled(FlexBox)`
  width: 37.75%;
  row-gap: 1.25rem;
  max-width: 26.5rem;
  flex-direction: column;
`;

const ProfileGradient = styled(FlexBox)`
  width: 12.5rem;
  height: 12.5rem;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const Initial = styled(Text)`
  font-size: 7rem;
  color: ${WHITE};
  font-weight: 600;
  position: absolute;
`;

const ContactLHS = styled(FlexBox)`
  width: 46.8%;
  row-gap: 1.25rem;
  max-width: 32.875rem;
  flex-direction: column;
`;

const DropSelect = styled(FlexBox)`
  width: 11.5rem;
  row-gap: 1.125rem;
  min-height: 12rem;
  border-radius: 0.5rem;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem 0.375rem;
  border: 2px solid ${GRAY_300};
`;

const DropOption = styled(FlexBox)`
  width: 100%;
  cursor: pointer;
  align-items: center;
  border-radius: 0.25rem;
  justify-content: center;
  padding: 0.625rem 0.75rem;
  background-color: ${WHITE};

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${PRIMARY_500};

      ${Text} {
        color: ${WHITE};
      }
    `}
`;

const commonIconProps = { size: "1.25rem", color: GRAY_600 };

const recordOptions = {
  other: { slug: "other", link: "" },
  mental: { slug: "mental", link: "/mental-health" },
  medical: { slug: "medical", link: "/medical-records" },
};

const personalLifeOptions = {
  fears: { slug: "fears" },
  dreams: { slug: "dreams" },
  worries: { slug: "worries" },
  interests: { slug: "interests" },
  hardships: { slug: "hardships" },
  friendsFamily: { slug: "friends-family" },
};

const assistanceOptions = {
  morning: { slug: "morning" },
  evening: { slug: "evening" },
  selfManaged: { slug: "self-managed" },
  asstRequired: { slug: "assistance-required" },
};

const Label = ({ children }) => <Text weight={500}>{children}</Text>;

const ProfileView = () => {
  const router = useRouter();
  const student = useSelector(state => state?.student?.profile);

  const [selectedAssistance, setSelectedAssistance] = useState(
    assistanceOptions?.selfManaged
  );
  const [selectedPersonalOption, setSelectedPersonalOption] = useState(
    personalLifeOptions?.friendsFamily
  );
  const [selectedRecord, setSelectedRecord] = useState(recordOptions?.medical);

  const {
    email,
    program,
    lastName,
    firstName,
    middleName,
    phoneNumber,
    primaryDiagnosis,
    emergencyContactName,
    emergencyContactEmail,
    emergencyContactPhoneNumber,
  } = student || {};

  const name = buildName(firstName, middleName, lastName);

  const goToEdit = link => router.push(router?.asPath + link);

  return (
    <Wrapper>
      <ProfileCard>
        <StudentLHS>
          <Text bold size="1.25rem" color={GRAY_700}>
            Student Personal Information
          </Text>

          <LabelAndText>
            <Label>Name</Label>
            <Text transform="capitalize">{name}</Text>
          </LabelAndText>

          <FlexBox align="center" justify="space-between">
            <LabelAndText>
              <Label>Program</Label>
              <Text>{program}</Text>
            </LabelAndText>

            {/* <LabelAndText>
              <Label>Term</Label>
              <Text>Year 1 Quarter 2</Text>
            </LabelAndText> */}
          </FlexBox>

          <LabelAndText>
            <Label>Primary Diagnosis</Label>
            <Text>{primaryDiagnosis}</Text>
          </LabelAndText>
        </StudentLHS>

        <FlexBox align="flex-start" colGap="3rem" color={GRAY_700}>
          <ProfileGradient>
            <Image
              priority
              width={200}
              height={200}
              draggable="false"
              alt="Profile Gradient"
              src="/assets/images/blue-gradient.svg"
            />
            <Initial>{firstName?.[0]?.toUpperCase()}</Initial>
          </ProfileGradient>
          <FiEdit2
            cursor="pointer"
            strokeWidth={2.5}
            {...commonIconProps}
            onClick={() => goToEdit("/personal-information")}
          />
        </FlexBox>
      </ProfileCard>

      <ProfileCard>
        <ContactLHS>
          <Text bold size="1.25rem" color={GRAY_700}>
            Contact Information
          </Text>

          <FlexBox align="center" justify="space-between">
            <FlexBox column rowGap="1.25rem">
              <LabelAndText>
                <Label>Email ID</Label>
                <Text>{email}</Text>
              </LabelAndText>

              <LabelAndText>
                <Label>Emergency Contact Name</Label>
                <Text>{emergencyContactName}</Text>
              </LabelAndText>

              <LabelAndText>
                <Label>Emergency Contact Name</Label>
                <Text>{emergencyContactEmail}</Text>
              </LabelAndText>
            </FlexBox>

            <FlexBox align="flex-start" column rowGap="1.25rem">
              <LabelAndText>
                <Label>Phone Number</Label>
                <Text>{phoneNumber}</Text>
              </LabelAndText>

              <LabelAndText>
                <Label>Emergency Contact Number</Label>
                <Text>{emergencyContactPhoneNumber}</Text>
              </LabelAndText>
            </FlexBox>
          </FlexBox>
        </ContactLHS>

        <FiEdit2
          cursor="pointer"
          strokeWidth={2.5}
          {...commonIconProps}
          onClick={() => goToEdit("/contact-information")}
        />
      </ProfileCard>

      <ProfileCard>
        <FlexBox column rowGap="1.25rem">
          <FlexBox align="center" colGap="0.5rem">
            <FiClipboard {...commonIconProps} />
            <Text bold size="1.25rem" color={GRAY_700}>
              Records
            </Text>
          </FlexBox>

          <Text>Cami’s medical records place holder 1</Text>

          <Text>Cami’s medical records place holder 2</Text>
        </FlexBox>

        <FlexBox colGap="2.25rem" align="flex-start">
          <FiEdit2
            cursor="pointer"
            strokeWidth={2.5}
            {...commonIconProps}
            onClick={() => goToEdit(selectedRecord?.link)}
          />

          <DropSelect>
            <DropOption
              onClick={() => setSelectedRecord(recordOptions?.medical)}
              selected={selectedRecord?.slug === recordOptions?.medical?.slug}
            >
              <Text weight={600}>Medical</Text>
            </DropOption>

            <DropOption
              onClick={() => setSelectedRecord(recordOptions?.mental)}
              selected={selectedRecord?.slug === recordOptions?.mental?.slug}
            >
              <Text weight={600}>Mental</Text>
            </DropOption>

            <DropOption
              onClick={() => setSelectedRecord(recordOptions?.other)}
              selected={selectedRecord?.slug === recordOptions?.other?.slug}
            >
              <Text weight={600}>Other</Text>
            </DropOption>
          </DropSelect>
        </FlexBox>
      </ProfileCard>

      <ProfileCard>
        <FlexBox column rowGap="1.25rem">
          <FlexBox align="center" colGap="0.5rem">
            <FiUser {...commonIconProps} />
            <Text bold size="1.25rem" color={GRAY_700}>
              Personal Life
            </Text>
          </FlexBox>

          <Text>Cami’s personal life place holder 1</Text>

          <Text>Cami’s personal life place holder 2</Text>
        </FlexBox>

        <FlexBox colGap="2.25rem" align="flex-start">
          <FiEdit2
            cursor="pointer"
            strokeWidth={2.5}
            {...commonIconProps}
            onClick={() => goToEdit("/personal-life")}
          />

          <DropSelect>
            <DropOption
              selected={
                selectedPersonalOption?.slug ===
                personalLifeOptions?.friendsFamily?.slug
              }
              onClick={() =>
                setSelectedPersonalOption(personalLifeOptions?.friendsFamily)
              }
            >
              <Text weight={600}>Friends/Family</Text>
            </DropOption>

            <DropOption
              selected={
                selectedPersonalOption?.slug ===
                personalLifeOptions?.dreams?.slug
              }
              onClick={() =>
                setSelectedPersonalOption(personalLifeOptions?.dreams)
              }
            >
              <Text weight={600}>Dreams</Text>
            </DropOption>

            <DropOption
              selected={
                selectedPersonalOption?.slug ===
                personalLifeOptions?.interests?.slug
              }
              onClick={() =>
                setSelectedPersonalOption(personalLifeOptions?.interests)
              }
            >
              <Text weight={600}>Interests</Text>
            </DropOption>

            <DropOption
              selected={
                selectedPersonalOption?.slug ===
                personalLifeOptions?.worries?.slug
              }
              onClick={() =>
                setSelectedPersonalOption(personalLifeOptions?.worries)
              }
            >
              <Text weight={600}>Worries</Text>
            </DropOption>

            <DropOption
              selected={
                selectedPersonalOption?.slug ===
                personalLifeOptions?.fears?.slug
              }
              onClick={() =>
                setSelectedPersonalOption(personalLifeOptions?.fears)
              }
            >
              <Text weight={600}>Fears</Text>
            </DropOption>

            <DropOption
              selected={
                selectedPersonalOption?.slug ===
                personalLifeOptions?.hardships?.slug
              }
              onClick={() =>
                setSelectedPersonalOption(personalLifeOptions?.hardships)
              }
            >
              <Text weight={600}>Hardships</Text>
            </DropOption>
          </DropSelect>
        </FlexBox>
      </ProfileCard>

      <ProfileCard>
        <FlexBox column rowGap="1.25rem">
          <FlexBox align="center" colGap="0.5rem">
            <FiBell {...commonIconProps} />
            <Text bold size="1.25rem" color={GRAY_700}>
              Assistance
            </Text>
          </FlexBox>

          <Text>Cami’s assistance place holder 1</Text>

          <Text>Cami’s assistance place holder 2</Text>
        </FlexBox>

        <FlexBox colGap="2.25rem" align="flex-start">
          <FiEdit2 {...commonIconProps} strokeWidth={2.5} cursor="pointer" />

          <DropSelect>
            <DropOption
              selected={
                selectedAssistance?.slug ===
                assistanceOptions?.selfManaged?.slug
              }
              onClick={() =>
                setSelectedAssistance(assistanceOptions?.selfManaged)
              }
            >
              <Text weight={600}>Self managed</Text>
            </DropOption>

            <DropOption
              selected={
                selectedAssistance?.slug ===
                assistanceOptions?.asstRequired?.slug
              }
              onClick={() =>
                setSelectedAssistance(assistanceOptions?.asstRequired)
              }
            >
              <Text weight={600}>Asst. Required</Text>
            </DropOption>

            <DropOption
              selected={
                selectedAssistance?.slug === assistanceOptions?.morning?.slug
              }
              onClick={() => setSelectedAssistance(assistanceOptions?.morning)}
            >
              <Text weight={600}>Morning Asst.</Text>
            </DropOption>

            <DropOption
              selected={
                selectedAssistance?.slug === assistanceOptions?.evening?.slug
              }
              onClick={() => setSelectedAssistance(assistanceOptions?.evening)}
            >
              <Text weight={600}>Evening Asst.</Text>
            </DropOption>
          </DropSelect>
        </FlexBox>
      </ProfileCard>

      <ProfileCard>
        <FlexBox column rowGap="2rem">
          <FlexBox align="center" colGap="0.5rem">
            <FiBell {...commonIconProps} />
            <Text bold size="1.25rem" color={GRAY_700}>
              Strength & Concern
            </Text>
          </FlexBox>

          <FlexBox column rowGap="1.25rem">
            <Text size="1.25rem" weight={500}>
              Student Identified Strength
            </Text>

            <FlexBox column rowGap="1.25rem" margin="0 0 0 1.5rem">
              <Text>Cami’s self-identified strength 1</Text>

              <Text>Cami’s self-identified strength 2</Text>
            </FlexBox>
          </FlexBox>

          <FlexBox column rowGap="1.25rem">
            <Text size="1.25rem" weight={500}>
              Family Identified Strength
            </Text>

            <FlexBox column rowGap="1.25rem" margin="0 0 0 1.5rem">
              <Text>Cami’s family-identified strength 1</Text>

              <Text>Cami’s family-identified strength 2</Text>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <FlexBox colGap="2.25rem">
          <FiEdit2 {...commonIconProps} strokeWidth={2.5} cursor="pointer" />

          <DropSelect>
            <DropOption selected>
              <Text weight={600}>Self managed</Text>
            </DropOption>
            <DropOption>
              <Text weight={600}>Asst. Required</Text>
            </DropOption>
            <DropOption>
              <Text weight={600}>Morning Asst.</Text>
            </DropOption>
            <DropOption>
              <Text weight={600}>Evening Asst.</Text>
            </DropOption>
          </DropSelect>
        </FlexBox>
      </ProfileCard>
    </Wrapper>
  );
};

export default ProfileView;
