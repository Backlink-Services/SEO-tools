import ProfileModal from "../components/shared/ProfileModal";
import ProfileList from "../components/ProfileList";

const ProfilePage: React.FC = () => {
  const handleCreateSubmit = (data: any) => {
    console.log('Create Profile Data:', data);
  };

  return (
    // <div className="w-100">
    //   <h1>Profiles Page</h1>
    //   <ProfileModal mode="create" onSubmit={handleCreateSubmit} />
    // </div>
    <div className="container mt-5">
      {/* Header + Create */}
      <div className="d-flex justify-content-between">
        <div className="">
          <h1>Profiles</h1>
        </div>
        <div className="d-flex align-items-center">
          <ProfileModal mode="create" onSubmit={handleCreateSubmit} />
        </div>
      </div>

      {/* Table list */}
      <ProfileList />
    </div>
  );
}

export default ProfilePage;
