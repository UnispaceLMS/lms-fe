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
  GRAY_50,
  GRAY_200,
  GRAY_300,
  GRAY_500,
  GRAY_600,
  GRAY_700,
  GRAY_800,
  PRIMARY_500,
} from "@constants/colors";
import { buildName } from "@utils/helpers";
import { studentPrograms } from "@metadata/programs";
import { concernEnums, strengthEnums } from "@metadata/strengthsConcerns";

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
  width: 80%;
  row-gap: 1.25rem;
  max-width: 56.25rem;
  flex-direction: column;
`;

const RecordsLHS = styled(FlexBox)`
  flex: 1;
  row-gap: 1.25rem;
  flex-direction: column;
`;

const AssistanceLHS = styled(FlexBox)`
  flex: 1;
  row-gap: 1.25rem;
  flex-direction: column;
`;

const DropSelect = styled(FlexBox)`
  height: 100%;
  width: 11.5rem;
  row-gap: 1.125rem;
  min-height: 12rem;
  border-radius: 0.5rem;
  flex-direction: column;
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

  ${Text} {
    font-weight: 400;
    color: ${GRAY_600};
  }

  ${({ selected }) =>
    selected &&
    css`
      background-color: ${PRIMARY_500};

      ${Text} {
        color: ${WHITE};
        font-weight: 600;
      }
    `}
`;

const AllergiesTable = styled.div`
  gap: 1px;
  width: 65%;
  display: grid;
  overflow: hidden;
  max-width: 37.5rem;
  border-radius: 0.5rem;
  background-color: ${GRAY_200};
  border: 1px solid ${GRAY_200};
  grid-template-columns: repeat(2, 1fr);
`;

const SupportTable = styled.div`
  gap: 1px;
  width: 90%;
  display: grid;
  overflow: hidden;
  max-width: 52.5rem;
  border-radius: 0.5rem;
  background-color: ${GRAY_200};
  border: 1px solid ${GRAY_200};
  grid-template-columns: 30% 35% 35%;
`;

const EmergencyContactTable = styled.div`
  gap: 1px;
  width: 100%;
  display: grid;
  overflow: hidden;
  border-radius: 0.5rem;
  background-color: ${GRAY_200};
  border: 1px solid ${GRAY_200};
  grid-template-columns: repeat(3, 1fr);
`;

const TableCell = styled(FlexBox)`
  width: 100%;
  padding: 0.75rem;
  background-color: ${WHITE};

  ${Text} {
    font-size: 0.75rem;
  }

  ${({ header }) =>
    header &&
    css`
      background-color: ${GRAY_50};

      ${Text} {
        font-weight: 600;
        color: ${GRAY_500};
      }
    `}

  ${({ footer }) =>
    footer &&
    css`
      background-color: ${GRAY_50};
    `}
`;

const commonIconProps = { size: "1.25rem", color: GRAY_600 };

const recordOptions = {
  mental: { slug: "mental", link: "/mental-health" },
  medical: { slug: "medical", link: "/medical-records" },
};

const personalLifeOptions = {
  fears: { slug: "fears" },
  worries: { slug: "worries" },
  interests: { slug: "interests" },
  hardships: { slug: "hardships" },
  friendsFamily: { slug: "friends-family" },
};

const assistanceOptions = {
  routine: { slug: "routine" },
  support: { slug: "support" },
};

const strengthConcernOptions = {
  concerns: { slug: "concerns" },
  strengths: { slug: "strengths" },
};

const Label = ({ children }) => (
  <Text color={GRAY_800} weight={500}>
    {children}
  </Text>
);

const AllergyRow = ({ allergy, reaction }) => (
  <>
    <TableCell>
      <Text color={GRAY_700}>{allergy}</Text>
    </TableCell>
    <TableCell>
      <Text color={GRAY_700}>{reaction}</Text>
    </TableCell>
  </>
);

const MedicalRecords = ({ allergies, primaryDiagnosis }) => (
  <>
    <FlexBox column rowGap="0.25rem">
      <Label>Primary Diagnosis</Label>
      <Text size="0.875rem" color={GRAY_700}>
        {primaryDiagnosis || "N/A"}
      </Text>
    </FlexBox>

    {!!allergies?.length && (
      <AllergiesTable>
        <>
          <TableCell header>
            <Text>Allergies</Text>
          </TableCell>
          <TableCell header>
            <Text>Allergies Reaction</Text>
          </TableCell>
        </>

        {allergies?.map(({ allergy, reaction }) => (
          <AllergyRow key={allergy} allergy={allergy} reaction={reaction} />
        ))}

        <>
          <TableCell footer>
            <Text>‎</Text>
          </TableCell>
          <TableCell footer>
            <Text>‎</Text>
          </TableCell>
        </>
      </AllergiesTable>
    )}
  </>
);

const MentalRecords = ({
  triggers,
  calmingStrategies,
  mentalHealthDiagnosis,
  mentalHealthStudentPerspective,
}) => (
  <>
    {mentalHealthDiagnosis && (
      <FlexBox column rowGap="0.25rem">
        <Label>Diagnosis</Label>
        <Text size="0.875rem" color={GRAY_700}>
          {mentalHealthDiagnosis || "N/A"}
        </Text>
      </FlexBox>
    )}
    <FlexBox column rowGap="0.25rem">
      <Label>Student Perspective</Label>
      <Text size="0.875rem" color={GRAY_700}>
        {mentalHealthStudentPerspective || "N/A"}
      </Text>
    </FlexBox>
    <FlexBox column rowGap="0.25rem">
      <Label>Triggers</Label>
      <Text size="0.875rem" color={GRAY_700}>
        {triggers?.join(", ") || "N/A"}
      </Text>
    </FlexBox>
    <FlexBox column rowGap="0.25rem">
      <Label>Coping Mechanism</Label>
      <Text size="0.875rem" color={GRAY_700}>
        {!!calmingStrategies?.length ? calmingStrategies?.join(", ") : "N/A"}
      </Text>
    </FlexBox>
  </>
);

const FriendsFamily = ({ friends, family }) => {
  return (
    <FlexBox column rowGap="1.25rem">
      <FlexBox column rowGap="1rem">
        <Label>Friends</Label>

        <Text size="0.875rem" color={GRAY_700}>
          {friends?.join(", ") || "N/A"}
        </Text>
      </FlexBox>

      <FlexBox column rowGap="1rem">
        <Label>Family</Label>

        <Text size="0.875rem" color={GRAY_700}>
          {family?.join(", ") || "N/A"}
        </Text>
      </FlexBox>
    </FlexBox>
  );
};

const Interests = ({ interests }) => {
  return (
    <FlexBox column rowGap="1rem">
      <Label>Interests</Label>

      {!!interests?.length ? (
        <Text size="0.875rem" color={GRAY_700}>
          {interests?.join(", ")}
        </Text>
      ) : (
        <Text size="0.875rem" color={GRAY_700}>
          N/A
        </Text>
      )}
    </FlexBox>
  );
};

const Worries = ({ worries }) => {
  return (
    <FlexBox column rowGap="1rem">
      <Label>Worries</Label>

      {!!worries?.length ? (
        <Text size="0.875rem" color={GRAY_700}>
          {worries?.join(", ")}
        </Text>
      ) : (
        <Text size="0.875rem" color={GRAY_700}>
          N/A
        </Text>
      )}
    </FlexBox>
  );
};

const Fears = ({ fears }) => {
  return (
    <FlexBox column rowGap="1rem">
      <Label>Fears</Label>

      {!!fears?.length ? (
        <Text size="0.875rem" color={GRAY_700}>
          {fears?.join(", ")}
        </Text>
      ) : (
        <Text size="0.875rem">N/A</Text>
      )}
    </FlexBox>
  );
};

const Hardships = ({ safetyConceptStruggles }) => (
  <FlexBox column rowGap="1rem">
    <Label>Safety Struggles</Label>

    {!!safetyConceptStruggles?.length ? (
      <Text size="0.875rem" color={GRAY_700}>
        {safetyConceptStruggles?.join(", ")}
      </Text>
    ) : (
      <Text size="0.875rem">N/A</Text>
    )}
  </FlexBox>
);

const Routine = ({ assistance = { morning: "", evening: "" } }) => (
  <>
    <FlexBox column rowGap="0.25rem">
      <Text color={GRAY_800}>Morning Assistance</Text>
      <Text size="0.875rem" color={GRAY_700}>
        {assistance?.morning || "N/A"}
      </Text>
    </FlexBox>

    <FlexBox column rowGap="0.25rem">
      <Text color={GRAY_800}>Evening Assistance</Text>
      <Text size="0.875rem" color={GRAY_700}>
        {assistance?.evening || "N/A"}
      </Text>
    </FlexBox>
  </>
);

const SupportRow = ({ location, condition, supportAndModificationToEnv }) => (
  <>
    <TableCell>
      <Text>{supportAndModificationToEnv}</Text>
    </TableCell>
    <TableCell>
      <Text>{condition}</Text>
    </TableCell>
    <TableCell>
      <Text>{location}</Text>
    </TableCell>
  </>
);

const Support = ({
  supports,
  accommodations,
  helpRequiredTasks,
  independentlyCapableTasks,
}) => (
  <>
    <FlexBox column rowGap="0.25rem">
      <Text color={GRAY_800}>Accommodations</Text>
      <Text size="0.875rem" color={GRAY_700}>
        {accommodations?.join(", ") || "N/A"}
      </Text>
    </FlexBox>

    <FlexBox column rowGap="0.25rem">
      <Text color={GRAY_800}>Independent Capabilities</Text>
      <Text size="0.875rem" color={GRAY_700}>
        {independentlyCapableTasks?.join(", ") || "N/A"}
      </Text>
    </FlexBox>

    <FlexBox column rowGap="0.25rem">
      <Text color={GRAY_800}>Help Required in (Areas)</Text>
      <Text size="0.875rem" color={GRAY_700}>
        {helpRequiredTasks?.join(", ") || "N/A"}
      </Text>
    </FlexBox>

    {!!supports?.length && (
      <SupportTable>
        <>
          <TableCell header>
            <Text>Support</Text>
          </TableCell>
          <TableCell header>
            <Text>Conditions</Text>
          </TableCell>
          <TableCell header>
            <Text>Location</Text>
          </TableCell>
        </>

        {supports?.map(
          ({ location, condition, supportAndModificationToEnv }) => (
            <SupportRow
              location={location}
              condition={condition}
              key={supportAndModificationToEnv}
              supportAndModificationToEnv={supportAndModificationToEnv}
            />
          )
        )}

        <>
          <TableCell footer>
            <Text>‎</Text>
          </TableCell>
          <TableCell footer>
            <Text>‎</Text>
          </TableCell>
          <TableCell footer>
            <Text>‎</Text>
          </TableCell>
        </>
      </SupportTable>
    )}
  </>
);

const Strengths = ({ strengths }) => {
  const familyIDd = strengths?.filter(
    ({ type }) => type === strengthEnums.family
  );
  const studentIDd = strengths?.filter(
    ({ type }) => type === strengthEnums.student
  );
  const teacherIDd = strengths?.filter(
    ({ type }) => type === strengthEnums.teacher
  );

  return (
    <FlexBox column rowGap="1.25rem">
      <FlexBox column rowGap="1rem">
        <Label>Student Identified Strengths</Label>

        {!!studentIDd?.length ? (
          <Text size="0.875rem" color={GRAY_700}>
            {studentIDd?.[0]?.note}
          </Text>
        ) : (
          <Text size="0.875rem" color={GRAY_700}>
            N/A
          </Text>
        )}
      </FlexBox>

      <FlexBox column rowGap="1rem">
        <Label>Family Identified Strengths</Label>

        {!!familyIDd?.length ? (
          <Text size="0.875rem" color={GRAY_700}>
            {familyIDd?.[0]?.note}
          </Text>
        ) : (
          <Text size="0.875rem" color={GRAY_700}>
            N/A
          </Text>
        )}
      </FlexBox>

      <FlexBox column rowGap="1rem">
        <Label>Teacher Identified Strengths</Label>

        {!!teacherIDd?.length ? (
          <Text size="0.875rem" color={GRAY_700}>
            {teacherIDd?.[0]?.note}
          </Text>
        ) : (
          <Text size="0.875rem" color={GRAY_700}>
            N/A
          </Text>
        )}
      </FlexBox>
    </FlexBox>
  );
};

const Concerns = ({ concerns }) => {
  const familyIDd = concerns?.filter(
    ({ type }) => type === concernEnums.family
  );
  const studentIDd = concerns?.filter(
    ({ type }) => type === concernEnums.student
  );
  const teacherIDd = concerns?.filter(
    ({ type }) => type === concernEnums.teacher
  );

  return (
    <FlexBox column rowGap="1.25rem">
      <FlexBox column rowGap="1rem">
        <Label>Student Identified Concerns</Label>

        {!!studentIDd?.length ? (
          <Text size="0.875rem" color={GRAY_700}>
            {studentIDd?.[0]?.note}
          </Text>
        ) : (
          <Text size="0.875rem" color={GRAY_700}>
            N/A
          </Text>
        )}
      </FlexBox>

      <FlexBox column rowGap="1rem">
        <Label>Family Identified Concerns</Label>

        {!!familyIDd?.length ? (
          <Text size="0.875rem" color={GRAY_700}>
            {familyIDd?.[0]?.note}
          </Text>
        ) : (
          <Text size="0.875rem" color={GRAY_700}>
            N/A
          </Text>
        )}
      </FlexBox>

      <FlexBox column rowGap="1rem">
        <Label>Teacher Identified Concerns</Label>

        {!!teacherIDd?.length ? (
          <Text size="0.875rem" color={GRAY_700}>
            {teacherIDd?.[0]?.note}
          </Text>
        ) : (
          <Text size="0.875rem" color={GRAY_700}>
            N/A
          </Text>
        )}
      </FlexBox>
    </FlexBox>
  );
};

const ProfileView = () => {
  const router = useRouter();
  const student = useSelector(state => state?.student?.profile);

  const [selectedAssistance, setSelectedAssistance] = useState(
    assistanceOptions?.routine
  );
  const [selectedPersonalOption, setSelectedPersonalOption] = useState(
    personalLifeOptions?.friendsFamily
  );
  const [selectedStrengthConcern, setSelectedStrengthConcern] = useState(
    strengthConcernOptions?.strengths
  );
  const [selectedRecord, setSelectedRecord] = useState(recordOptions?.medical);

  let {
    email,
    fears,
    family,
    friends,
    program,
    worries,
    lastName,
    concerns,
    supports,
    triggers,
    firstName,
    interests,
    strengths,
    allergies,
    middleName,
    eveningHelp,
    morningHelp,
    phoneNumber,
    accommodations,
    primaryDiagnosis,
    helpRequiredTasks,
    calmingStrategies,
    emergencyContactName,
    mentalHealthDiagnosis,
    emergencyContactEmail,
    safetyConceptStruggles,
    independentlyCapableTasks,
    emergencyContactPhoneNumber,
    secondaryEmergencyContactName,
    secondaryEmergencyContactEmail,
    mentalHealthStudentPerspective,
    secondaryEmergencyContactPhoneNumber,
  } = student || {};

  program = studentPrograms?.find(({ value }) => value === program)?.label;

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
            <Text transform="capitalize" size="0.875rem" color={GRAY_700}>
              {name}
            </Text>
          </LabelAndText>

          <FlexBox align="center" justify="space-between" colGap="1rem">
            <LabelAndText>
              <Label>Program</Label>
              <Text size="0.875rem" color={GRAY_700}>
                {program}
              </Text>
            </LabelAndText>

            {/* <LabelAndText>
              <Label>Term</Label>
              <Text>Year 1 Quarter 2</Text>
            </LabelAndText> */}
          </FlexBox>

          {primaryDiagnosis && (
            <LabelAndText>
              <Label>Primary Diagnosis</Label>
              <Text size="0.875rem" color={GRAY_700}>
                {primaryDiagnosis}
              </Text>
            </LabelAndText>
          )}
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

          <FlexBox column rowGap="1.25rem" align="flex-start">
            <FlexBox colGap="12.5rem">
              <LabelAndText>
                <Label>Email ID</Label>
                <Text size="0.875rem" color={GRAY_700}>
                  {email}
                </Text>
              </LabelAndText>

              <LabelAndText>
                <Label>Phone Number</Label>
                <Text size="0.875rem" color={GRAY_700}>
                  {phoneNumber}
                </Text>
              </LabelAndText>
            </FlexBox>

            <EmergencyContactTable>
              <>
                <TableCell header>
                  <Text>Emergency Contact Name</Text>
                </TableCell>
                <TableCell header>
                  <Text>Emergency Contact Email</Text>
                </TableCell>
                <TableCell header>
                  <Text>Emergency Contact Phone</Text>
                </TableCell>
              </>

              <>
                <TableCell>
                  <Text>{emergencyContactName}</Text>
                </TableCell>
                <TableCell>
                  <Text>{emergencyContactEmail}</Text>
                </TableCell>
                <TableCell>
                  <Text>{emergencyContactPhoneNumber}</Text>
                </TableCell>
              </>

              {secondaryEmergencyContactName && (
                <>
                  <TableCell>
                    <Text>{secondaryEmergencyContactName}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{secondaryEmergencyContactEmail || "N/A"}</Text>
                  </TableCell>
                  <TableCell>
                    <Text>{secondaryEmergencyContactPhoneNumber || "N/A"}</Text>
                  </TableCell>
                </>
              )}

              <>
                <TableCell footer>
                  <Text>‎</Text>
                </TableCell>
                <TableCell footer>
                  <Text>‎</Text>
                </TableCell>
                <TableCell footer>
                  <Text>‎</Text>
                </TableCell>
              </>
            </EmergencyContactTable>
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
        <RecordsLHS>
          <FlexBox align="center" colGap="0.5rem">
            <FiClipboard {...commonIconProps} />
            <Text bold size="1.25rem" color={GRAY_700}>
              Records
            </Text>
          </FlexBox>

          {selectedRecord?.slug === recordOptions?.medical?.slug && (
            <MedicalRecords
              allergies={allergies}
              primaryDiagnosis={primaryDiagnosis}
            />
          )}

          {selectedRecord?.slug === recordOptions?.mental?.slug && (
            <MentalRecords
              triggers={triggers}
              calmingStrategies={calmingStrategies}
              mentalHealthDiagnosis={mentalHealthDiagnosis}
              mentalHealthStudentPerspective={mentalHealthStudentPerspective}
            />
          )}
        </RecordsLHS>

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
              <Text>Medical</Text>
            </DropOption>

            <DropOption
              onClick={() => setSelectedRecord(recordOptions?.mental)}
              selected={selectedRecord?.slug === recordOptions?.mental?.slug}
            >
              <Text>Mental</Text>
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

          {selectedPersonalOption?.slug ===
            personalLifeOptions?.friendsFamily?.slug && (
            <FriendsFamily friends={friends} family={family} />
          )}

          {selectedPersonalOption?.slug ===
            personalLifeOptions?.interests?.slug && (
            <Interests interests={interests} />
          )}

          {selectedPersonalOption?.slug ===
            personalLifeOptions?.worries?.slug && <Worries worries={worries} />}

          {selectedPersonalOption?.slug ===
            personalLifeOptions?.fears?.slug && <Fears fears={fears} />}

          {selectedPersonalOption?.slug ===
            personalLifeOptions?.hardships?.slug && (
            <Hardships safetyConceptStruggles={safetyConceptStruggles} />
          )}
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
              <Text>Friends/Family</Text>
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
              <Text>Interests</Text>
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
              <Text>Worries</Text>
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
              <Text>Fears</Text>
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
              <Text>Hardships</Text>
            </DropOption>
          </DropSelect>
        </FlexBox>
      </ProfileCard>

      <ProfileCard>
        <AssistanceLHS>
          <FlexBox align="center" colGap="0.5rem">
            <Image
              width={24}
              height={24}
              alt="Assistance"
              draggable="false"
              src="/assets/images/person_raised_hand.svg"
            />
            <Text bold size="1.25rem" color={GRAY_700}>
              Assistance
            </Text>
          </FlexBox>

          {selectedAssistance?.slug === assistanceOptions?.routine?.slug && (
            <Routine
              assistance={{
                morning: morningHelp,
                evening: eveningHelp,
              }}
            />
          )}

          {selectedAssistance?.slug === assistanceOptions?.support?.slug && (
            <Support
              supports={supports}
              accommodations={accommodations}
              helpRequiredTasks={helpRequiredTasks}
              independentlyCapableTasks={independentlyCapableTasks}
            />
          )}
        </AssistanceLHS>

        <FlexBox colGap="2.25rem" align="flex-start">
          <FiEdit2
            {...commonIconProps}
            cursor="pointer"
            strokeWidth={2.5}
            onClick={() => goToEdit("/assistance-support")}
          />

          <DropSelect>
            <DropOption
              selected={
                selectedAssistance?.slug === assistanceOptions?.routine?.slug
              }
              onClick={() => setSelectedAssistance(assistanceOptions?.routine)}
            >
              <Text>Routine</Text>
            </DropOption>

            <DropOption
              selected={
                selectedAssistance?.slug === assistanceOptions?.support?.slug
              }
              onClick={() => setSelectedAssistance(assistanceOptions?.support)}
            >
              <Text>Support</Text>
            </DropOption>
          </DropSelect>
        </FlexBox>
      </ProfileCard>

      <ProfileCard>
        <FlexBox column rowGap="2rem">
          <FlexBox align="center" colGap="0.5rem">
            <Image
              width={24}
              height={24}
              draggable="false"
              alt="Strengths_Concerns"
              src="/assets/images/award_star.svg"
            />
            <Text bold size="1.25rem" color={GRAY_700}>
              Strength & Concern
            </Text>
          </FlexBox>

          {selectedStrengthConcern?.slug ===
            strengthConcernOptions?.strengths?.slug && (
            <Strengths strengths={strengths} />
          )}

          {selectedStrengthConcern?.slug ===
            strengthConcernOptions?.concerns?.slug && (
            <Concerns concerns={concerns} />
          )}
        </FlexBox>

        <FlexBox colGap="2.25rem">
          <FiEdit2
            {...commonIconProps}
            cursor="pointer"
            strokeWidth={2.5}
            onClick={() => goToEdit("/strengths-concerns")}
          />

          <DropSelect>
            <DropOption
              selected={
                selectedStrengthConcern?.slug ===
                strengthConcernOptions?.strengths?.slug
              }
              onClick={() =>
                setSelectedStrengthConcern(strengthConcernOptions?.strengths)
              }
            >
              <Text>Strengths</Text>
            </DropOption>
            <DropOption
              selected={
                selectedStrengthConcern?.slug ===
                strengthConcernOptions?.concerns?.slug
              }
              onClick={() =>
                setSelectedStrengthConcern(strengthConcernOptions?.concerns)
              }
            >
              <Text>Concerns</Text>
            </DropOption>
          </DropSelect>
        </FlexBox>
      </ProfileCard>
    </Wrapper>
  );
};

export default ProfileView;
