import React from "react";

import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import ProfileView from "@components/StudentProfile/ProfileView";

const ProfilePage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <ProfileView />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default ProfilePage;
