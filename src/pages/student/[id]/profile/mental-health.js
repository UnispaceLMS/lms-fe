import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import MentalHealth from "@components/StudentProfile/MentalHealth";

const MentalHealthPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <MentalHealth />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default MentalHealthPage;
