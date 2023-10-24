import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import AnnualPlan from "@components/AnnualPlan";

const AnnualPlanPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <AnnualPlan />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default AnnualPlanPage;
