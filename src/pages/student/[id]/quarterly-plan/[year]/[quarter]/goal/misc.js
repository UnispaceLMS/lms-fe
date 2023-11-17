import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import GoalPageLayout from "@layouts/GoalPageLayout";
import DashboardLayout from "@layouts/DashboardLayout";
import QuarterlyPlanLayout from "@layouts/QuarterlyPlanLayout";

import Misc from "@components/GoalCreation/Misc";

const MiscPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <GoalPageLayout>
          <QuarterlyPlanLayout>
            <Misc isQuarterlyPlan />
          </QuarterlyPlanLayout>
        </GoalPageLayout>
      </DashboardLayout>
    </StudentProfile>
  );
};

export default MiscPage;
