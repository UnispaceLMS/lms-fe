import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import GoalPageLayout from "@layouts/GoalPageLayout";
import DashboardLayout from "@layouts/DashboardLayout";

import HealthWellness from "@/components/AnnualPlan/Goal/HealthWellness";

const HealthWellnessPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <GoalPageLayout>
          <HealthWellness />
        </GoalPageLayout>
      </DashboardLayout>
    </StudentProfile>
  );
};

export default HealthWellnessPage;
