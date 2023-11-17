import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import GoalPageLayout from "@layouts/GoalPageLayout";
import DashboardLayout from "@layouts/DashboardLayout";
import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import HomeManagement from "@components/GoalCreation/HomeManagement";

const HomeManagementPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <GoalPageLayout>
          <AnnualPlanLayout>
            <HomeManagement />
          </AnnualPlanLayout>
        </GoalPageLayout>
      </DashboardLayout>
    </StudentProfile>
  );
};

export default HomeManagementPage;
