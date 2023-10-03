import DashboardLayout from "@layouts/DashboardLayout";

import PersonalInformation from "@components/StudentProfile/PersonalInformation";

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <PersonalInformation />
    </DashboardLayout>
  );
};

export default ProfilePage;
