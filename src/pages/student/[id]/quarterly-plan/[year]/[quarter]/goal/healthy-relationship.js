import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import GoalPageLayout from "@layouts/GoalPageLayout";
import DashboardLayout from "@layouts/DashboardLayout";
import QuarterlyPlanLayout from "@layouts/QuarterlyPlanLayout";

import HealthyRelationship from "@components/GoalCreation/HealthyRelationship";

const HealthyRelationshipPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <GoalPageLayout>
          <QuarterlyPlanLayout>
            <HealthyRelationship isQuarterlyPlan />
          </QuarterlyPlanLayout>
        </GoalPageLayout>
      </DashboardLayout>
    </StudentProfile>
  );
};

export default HealthyRelationshipPage;
