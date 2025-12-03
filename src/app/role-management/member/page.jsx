import UsersPage from "@/components/molecules/settings/AddUser";
import MainLayout from "@/components/templates/templates/MainLayout";

const page = async ({ searchParams }) => {
  const { q } = await searchParams;
  return (
    <MainLayout>
      <UsersPage searchQuery={q} />
    </MainLayout>
  );
};

export default page;
