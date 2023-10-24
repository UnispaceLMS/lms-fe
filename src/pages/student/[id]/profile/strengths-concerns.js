import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import StrengthsConcerns from "@components/StudentProfile/StrengthsConcerns";

const StrengthsPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <StrengthsConcerns />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default StrengthsPage;
