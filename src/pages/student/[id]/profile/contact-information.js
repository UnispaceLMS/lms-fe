import StudentProfile from "@layouts/StudentProfile";
import DashboardLayout from "@layouts/DashboardLayout";

import ContactInformation from "@components/StudentProfile/ContactInformation";

const ContactInformationPage = () => {
  return (
    <StudentProfile>
      <DashboardLayout>
        <ContactInformation />
      </DashboardLayout>
    </StudentProfile>
  );
};

export default ContactInformationPage;
