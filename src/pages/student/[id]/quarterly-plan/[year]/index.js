import React from "react";
import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import QuarterlyPlan from "@components/QuarterlyPlan";

const QuarterlyReportPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <QuarterlyPlan />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default QuarterlyReportPage;
