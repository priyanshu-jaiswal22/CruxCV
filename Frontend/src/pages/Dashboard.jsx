import DashboardLayout from "../components/DashboardLayout";
import SectionCard from "../components/SectionCard";
import ResumeUpload from "../components/ResumeUpload";
import ResumeHistory from "../components/ResumeHistory";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <SectionCard title="Upload Resume">
        <ResumeUpload />
      </SectionCard>

      <SectionCard title="Your Resume History">
        <ResumeHistory />
      </SectionCard>
    </DashboardLayout>
  );
}
