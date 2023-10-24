import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import PersonalInformation from "@components/StudentProfile/PersonalInformation";

const PersonalInformationPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <PersonalInformation />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default PersonalInformationPage;
