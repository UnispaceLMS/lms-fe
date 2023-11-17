import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import GoalPageLayout from "@layouts/GoalPageLayout";
import DashboardLayout from "@layouts/DashboardLayout";
import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import MoneyManagement from "@components/GoalCreation/MoneyManagement";

const MoneyManagementPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <GoalPageLayout>
          <AnnualPlanLayout>
            <MoneyManagement />
          </AnnualPlanLayout>
        </GoalPageLayout>
      </DashboardLayout>
    </StudentProfile>
  );
};

export default MoneyManagementPage;
