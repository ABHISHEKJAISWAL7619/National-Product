import CreateRole from "@/components/molecules/settings/CreateRole";
import MainLayout from "@/components/templates/templates/MainLayout";

const page = async ({ searchParams }) => {
  const { q, page } = await searchParams;
  return (
    <MainLayout>
      <CreateRole searchquery={q} currPage={page} />
    </MainLayout>
  );
};

export default page;
