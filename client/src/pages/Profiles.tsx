
import ProfileModal from "../components/shared/ProfileModal";
import ProfileData from '../data/ProfileData';

const CreateProfile: React.FC = () => {
  const handleCreateSubmit = (data: any) => {
    console.log('Create Profile Data:', data);
  };

  return (
    // <div className="w-100">
    //   <h1>Profiles Page</h1>
    //   <ProfileModal mode="create" onSubmit={handleCreateSubmit} />
    // </div>
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <div className="">
          <h1>Profiles</h1>
        </div>
        <div className="d-flex align-items-center">
          <ProfileModal mode="create" onSubmit={handleCreateSubmit} />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12">
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">URL</th>
              </tr>
            </thead>
            <tbody>
              {ProfileData.map((profile) => (
                <tr key={profile.id}>
                  <th scope="row">{profile.id}</th>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>{profile.name}</td>
                  <td className="text-truncate" style={{ maxWidth: '200px' }}>
                    <a href={profile.url} target="_blank" rel="noopener noreferrer">
                      {profile.url}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreateProfile;
