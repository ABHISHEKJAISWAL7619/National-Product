import AddNew from "@/components/molecules/settings/AddNew";
import MainLayout from "@/components/templates/templates/MainLayout";

const page = async ({ params }) => {
  const { memberId } = await params;
  return (
    <MainLayout>
      <AddNew memberId={memberId} />
    </MainLayout>
  );
};

export default page;
