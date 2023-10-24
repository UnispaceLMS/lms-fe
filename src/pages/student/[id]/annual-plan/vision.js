import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import Vision from "@components/AnnualPlan/Vision";

const VisionPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <Vision />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default VisionPage;
