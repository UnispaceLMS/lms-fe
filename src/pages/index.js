import React from "react";
import DashboardLayout from "@layouts/DashboardLayout";
import {
  PrimaryButton,
  SecondaryButton,
  UploadButton,
  ViewButton,
} from "@/components/common/Buttons";

const HomePage = () => {
  return (
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          flexWrap: "wrap",
          padding: "1rem",
        }}
      >
        <PrimaryButton disabled="true">Save</PrimaryButton>
        <SecondaryButton disabled="true">Add Note</SecondaryButton>
        <UploadButton />
        <ViewButton />
      </div>
    </DashboardLayout>
  );
};

export default HomePage;
