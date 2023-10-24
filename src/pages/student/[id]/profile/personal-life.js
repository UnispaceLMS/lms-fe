import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import PersonalLife from "@components/StudentProfile/PersonalLife";

const PersonalLifePage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <PersonalLife />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default PersonalLifePage;
