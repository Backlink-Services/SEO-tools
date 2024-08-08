import { useContext, useState } from 'react'
import SpinnerLoading from '../utils/SpinnerLoading'
import axios from 'axios'
import ProfileContext, { ProfileContextType } from '../context/ProfileContext'

const CommentPage: React.FC = () => {
  const { profiles } = useContext(ProfileContext) as ProfileContextType
  const [loading, setLoading] = useState<boolean>(false)
  const [dataResp, setDataResp] = useState<string[]>([])
  const [numSuccess, setNumSuccess] = useState<number>(0)

  // input data & send request
  const [textareaValue, setTextareaValue] = useState<string>('')
  const [selectedProfileId, setSelectedProfileId] = useState('')

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        let text = e.target?.result as string
        // Remove surrounding quotation marks from each line
        text = text
          .split('\n')
          .map((line) => line.trim().replace(/^"|"$/g, ''))
          .join('\n')
        setTextareaValue(text)
      }
      reader.readAsText(file)
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value)
    console.log(e.target.value)
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProfileId(e.target.value)
    console.log(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const urlsArray = textareaValue
      .split('\n')
      .filter((url) => url.trim() !== '')
    try {
      const loginURL: string = 'http://localhost:8080/seo/comment'
      const response = await axios.post(loginURL, {
        profileId: selectedProfileId,
        urls: urlsArray,
      })
      console.log(response)
      const { result, success } = response.data.data
      setNumSuccess(success)
      setDataResp(result)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
    }
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Auto Comment</h1>
      <div className="row">
        {/* COMMENT STATUS */}
        <div className="col-md-6 d-flex flex-column">
          <div className="row">
            <h4>Status</h4>
          </div>
          <div className="row overflow-auto" style={{ maxHeight: '240px' }}>
            {loading ? (
              <SpinnerLoading />
            ) : (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">URL</th>
                    <th scope="col">State</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mock data for status table */}
                  {dataResp.map((item, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td
                          className="text-truncate"
                          style={{ maxWidth: '150px' }}
                        >
                          {item[0]}
                        </td>
                        <td>{item[1]}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
          {numSuccess > 0 && (
            <div>
              Success: {numSuccess}/{dataResp.length}
            </div>
          )}
        </div>

        {/* INPUT DATA */}
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h4>URLS</h4>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <select
                className="form-select w-50"
                aria-label="Default select example"
                style={{ cursor: 'pointer' }}
                value={selectedProfileId}
                onChange={handleSelectChange}
                required
              >
                <option value="" disabled>
                  Choose a profile
                </option>
                {profiles?.map((profile, index) => (
                  <option value={profile._id} key={index}>
                    {profile.name}
                  </option>
                ))}
              </select>

              <label
                className="btn btn-outline-primary"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Only .csv files"
              >
                <i className="fa fa-upload me-2" aria-hidden="true"></i>Upload CSV
                <input
                  type="file"
                  className="d-none"
                  accept=".csv"
                  onChange={handleCSVUpload}
                />
              </label>
            </div>
            <textarea
              className="form-control mb-3"
              rows={10}
              onChange={handleTextareaChange}
              value={textareaValue}
              required
            ></textarea>

            <button
              type="submit"
              className="btn btn-success w-100 mb-3"
              disabled={loading || !selectedProfileId || !textareaValue}
            >
              START
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CommentPage
