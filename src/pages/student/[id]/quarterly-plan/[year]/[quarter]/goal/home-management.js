import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import GoalPageLayout from "@layouts/GoalPageLayout";
import DashboardLayout from "@layouts/DashboardLayout";
import QuarterlyPlanLayout from "@layouts/QuarterlyPlanLayout";

import HomeManagement from "@components/GoalCreation/HomeManagement";

const HomeManagementPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <GoalPageLayout>
          <QuarterlyPlanLayout>
            <HomeManagement isQuarterlyPlan />
          </QuarterlyPlanLayout>
        </GoalPageLayout>
      </DashboardLayout>
    </StudentProfile>
  );
};

export default HomeManagementPage;
