import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import Transition from "@components/StudentProfile/Transition";

const ConcernsPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <Transition />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default ConcernsPage;
