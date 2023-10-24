import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import Assessment from "@components/AnnualPlan/Assessment";

const AssessmentPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <Assessment />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default AssessmentPage;
