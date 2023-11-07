import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import PresentLevels from "@components/AnnualPlan/PresentLevels";

const PresentLevelsPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <PresentLevels />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default PresentLevelsPage;
