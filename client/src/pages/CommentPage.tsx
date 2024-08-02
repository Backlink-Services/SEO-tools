import { useContext } from "react";
import ProfileContext, { ProfileContextType } from "../context/ProfileContext";

const CommentPage: React.FC = () => {
  const { profiles } = useContext(ProfileContext) as ProfileContextType;
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 d-flex flex-column">
          <div className="row mb-4">
            <h1>Auto Comment</h1>
          </div>
          <div className="row overflow-auto" style={{ maxHeight: '240px' }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">URL</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Mock data for status table */}
                <tr>
                  <th scope="row">1</th>
                  <td>https://example.com</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>https://anotherexample.com</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>https://somethingexample.com</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>https://somethingexample.com</td>
                  <td>Success</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>https://somethingexample.com</td>
                  <td>Success</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-md-6">
          <form>
            <h4>URLS</h4>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <select className="form-select w-50" aria-label="Default select example">
                <option selected>Choose a profile to post</option>
                {profiles?.map(profile => (
                  <option value={profile.id}>
                    {profile.name}
                  </option>
                ))}
              </select>
              
              <label className="btn btn-outline-primary">
                <i className="fa fa-upload me-2" aria-hidden="true"></i>Upload CSV
                <input type="file" className="d-none" />
              </label>
            </div>
            <textarea className="form-control mb-3" rows={10}></textarea>
            <button type="submit" className="btn btn-success w-100 mb-3">START</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentPage;