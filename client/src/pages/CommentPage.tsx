import { useContext, useState } from "react";
import ProfileContext, { ProfileContextType } from "../context/ProfileContext";

const CommentPage: React.FC = () => {
  const { profiles } = useContext(ProfileContext) as ProfileContextType;

  // input data
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [selectedProfileId, setSelectedProfileId] = useState("");

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setTextareaValue(text);
      };
      reader.readAsText(file);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
    console.log(e.target.value);
};


  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfileId(e.target.value);
    console.log(e.target.value);
  };
  // --------- //

  return (
    <div className="container mt-5">
      <div className="row">
        {/* COMMENT STATUS */}
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

        {/* INPUT DATA */}
        <div className="col-md-6">
          <form>
            <h4>URLS</h4>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <select className="form-select w-50" 
                aria-label="Default select example"
                style={{ cursor: 'pointer' }}
                // defaultValue="Choose a profile to post"
                value={selectedProfileId}
                onChange={handleSelectChange}
              >
                <option disabled>Choose a profile to post</option>
                {profiles?.map(profile => (
                  <option value={profile.id} key={profile.id}>
                    {profile.name}
                  </option>
                ))}
              </select>
              
              <label className="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="Only .csv files">
                <i className="fa fa-upload me-2" aria-hidden="true"></i>Upload CSV
                <input type="file" className="d-none" accept=".csv" onChange={handleCSVUpload} />
              </label>
            </div>
            <textarea className="form-control mb-3" rows={10} onChange={handleTextareaChange} value={textareaValue}></textarea>
            <button type="submit" className="btn btn-success w-100 mb-3">START</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default CommentPage;