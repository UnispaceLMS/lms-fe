import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import GoalPageLayout from "@layouts/GoalPageLayout";
import DashboardLayout from "@layouts/DashboardLayout";
import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import Employment from "@components/GoalCreation/Employment";

const EmploymentPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <GoalPageLayout>
          <AnnualPlanLayout>
            <Employment />
          </AnnualPlanLayout>
        </GoalPageLayout>
      </DashboardLayout>
    </StudentProfile>
  );
};

export default EmploymentPage;
