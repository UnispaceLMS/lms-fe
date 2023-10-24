import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import AssistanceSupport from "@components/StudentProfile/AssistanceSupport";

const AssistancePage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <AssistanceSupport />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default AssistancePage;
