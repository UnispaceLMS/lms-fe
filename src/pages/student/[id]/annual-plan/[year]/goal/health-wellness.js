import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import GoalPageLayout from "@layouts/GoalPageLayout";
import DashboardLayout from "@layouts/DashboardLayout";
import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import HealthWellness from "@components/GoalCreation/HealthWellness";

const HealthWellnessPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <GoalPageLayout>
          <AnnualPlanLayout>
            <HealthWellness />
          </AnnualPlanLayout>
        </GoalPageLayout>
      </DashboardLayout>
    </StudentProfile>
  );
};

export default HealthWellnessPage;
