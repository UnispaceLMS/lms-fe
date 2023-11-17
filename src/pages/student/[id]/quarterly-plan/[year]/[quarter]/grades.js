import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";
import QuarterlyPlanLayout from "@layouts/QuarterlyPlanLayout";

import Grades from "@components/QuarterlyPlan/Grades";

const GradesPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <QuarterlyPlanLayout>
          <Grades />
        </QuarterlyPlanLayout>
      </DashboardLayout>
    </StudentProfile>
  );
};

export default GradesPage;
