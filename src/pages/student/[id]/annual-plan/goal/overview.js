import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import GoalPageLayout from "@layouts/GoalPageLayout";
import DashboardLayout from "@layouts/DashboardLayout";

import Overview from "@components/AnnualPlan/Goal/Overview";

const OverviewPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <GoalPageLayout>
          <Overview />
        </GoalPageLayout>
      </DashboardLayout>
    </StudentProfile>
  );
};

export default OverviewPage;
