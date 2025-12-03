import MainLayout from "@/components/templates/templates/MainLayout";
import RoleForm from "@/components/molecules/settings/Role";

const page = async ({ params }) => {
  const { roleId } = await params;
  return (
    <MainLayout>
      <RoleForm roleId={roleId} />
    </MainLayout>
  );
};

export default page;
