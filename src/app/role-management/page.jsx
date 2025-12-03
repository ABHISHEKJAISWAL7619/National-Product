import Dashboard from "@/components/pages/settings";
import MainLayout from "@/components/templates/templates/MainLayout";

const SettingsMainPage = async ({ searchParams }) => {
  const { q, page } = await searchParams;
  return (
    <MainLayout>
      <Dashboard searchQuery={q} currPage={page} />
    </MainLayout>
  );
};

export default SettingsMainPage;
