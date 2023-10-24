import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import MedicalRecords from "@components/StudentProfile/MedicalRecords";

const MedicalRecordsPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <MedicalRecords />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default MedicalRecordsPage;
