import { useContext, useState } from 'react'
import SpinnerLoading from '../utils/SpinnerLoading'
import axios from 'axios'
import ProfileContext, { ProfileContextType } from '../context/ProfileContext'

const CommentPage: React.FC = () => {
  const { profiles } = useContext(ProfileContext) as ProfileContextType
  const [loading, setLoading] = useState<boolean>(false)

  // input data & send request
  const [textareaValue, setTextareaValue] = useState<string>('')
  const [selectedProfileId, setSelectedProfileId] = useState('')

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const text = e.target?.result as string
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
      console.log('urls ', response)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
    }
  }

  // if (loading) {
  //   return (
  //     <SpinnerLoading />
  //   )
  // }

  // --------- //

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
                <tr>
                  <th scope="row">1</th>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    https://vocal.media/lifehack/mindful-music
                  </td>
                  <td>Success</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    https://www.blendermarket.com/posts/contours-polystrips-combined?page=3
                  </td>
                  <td>Failed</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    http://forum.asustor.com/viewtopic.php?f=130&p=15901&t=5143
                  </td>
                  <td>Success</td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    https://ged.com/insession/new-employers-offering-gedworks_august2021/
                  </td>
                  <td>Success</td>
                </tr>
                <tr>
                  <th scope="row">5</th>
                  <td className="text-truncate" style={{ maxWidth: '150px' }}>
                    https://my.rosenbauer.com/en-US/forums/support-forum/79de424e-174e-ee11-a81c-6045bd9b2daa
                  </td>
                  <td>Pending</td>
                </tr>
              </tbody>
            </table>
          </div>
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
                // defaultValue="Choose a profile to post"
                value={selectedProfileId}
                onChange={handleSelectChange}
              >
                <option disabled>Choose a profile to post</option>
                {profiles?.map((profile) => (
                  <option value={profile._id} key={profile._id}>
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
                <i className="fa fa-upload me-2" aria-hidden="true"></i>Upload
                CSV
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
            ></textarea>
            {/* <button type="submit" className="btn btn-success w-100 mb-3">START</button> */}
            {loading ? (
              <SpinnerLoading />
            ) : (
              <button type="submit" className="btn btn-success w-100 mb-3">
                START
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default CommentPage
