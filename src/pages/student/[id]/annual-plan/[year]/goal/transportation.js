import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import GoalPageLayout from "@layouts/GoalPageLayout";
import DashboardLayout from "@layouts/DashboardLayout";
import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import Transportation from "@components/GoalCreation/Transportation";

const TransportationPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <GoalPageLayout>
          <AnnualPlanLayout>
            <Transportation />
          </AnnualPlanLayout>
        </GoalPageLayout>
      </DashboardLayout>
    </StudentProfile>
  );
};

export default TransportationPage;
