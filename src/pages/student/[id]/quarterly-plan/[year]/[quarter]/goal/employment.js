import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import GoalPageLayout from "@layouts/GoalPageLayout";
import DashboardLayout from "@layouts/DashboardLayout";
import QuarterlyPlanLayout from "@layouts/QuarterlyPlanLayout";

import Employment from "@components/GoalCreation/Employment";

const EmploymentPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <GoalPageLayout>
          <QuarterlyPlanLayout>
            <Employment isQuarterlyPlan />
          </QuarterlyPlanLayout>
        </GoalPageLayout>
      </DashboardLayout>
    </StudentProfile>
  );
};

export default EmploymentPage;
