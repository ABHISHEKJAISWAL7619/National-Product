import UsersPage from "@/components/molecules/settings/AddUser";
import SettingsProfile from "@/components/molecules/settings/SettingsProfile";
const Dashboard = ({ searchQuery, currPage }) => {
  return (
    <>
      <SettingsProfile searchQuery={searchQuery} />
      {/* <Security /> */}
      {/* <EmailNotifications /> */}
      {/* <GeneralPrefrences/> */}
      <div className="mt-4">
        <UsersPage searchQuery={searchQuery} currPage={currPage} />
      </div>
    </>
  );
};

export default Dashboard;
