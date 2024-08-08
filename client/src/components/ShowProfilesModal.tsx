import { useState } from 'react';
import ProfileList from './ProfileList';
import { IoMdEye } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { PiEyesFill } from "react-icons/pi";
import { ImEye } from "react-icons/im";

const ShowProfilesModal: React.FC = () => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div>
            <button 
                className="btn btn-outline-success"
                type="button"
                onClick={handleShow}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Show Profiles"
            >
                <div className="d-flex align-items-center">
                    {/* <i className="fa fa-eye me-2" aria-hidden="true"></i> */}
                    {/* <IoMdEye className='me-2' size={22} /> */}
                    <FaRegEye className='me-2' size={20} />
                    {/* <PiEyesFill className='me-2' size={20}/> */}
                    {/* <ImEye className='me-2' size={20} /> */}
                    Show Profiles
                </div>
            </button>

            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex={-1} style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="showProfileModalLabel" aria-hidden={!showModal}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="showProfileModalLabel">Profiles</h5>
                            <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ProfileList />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default ShowProfilesModal;
