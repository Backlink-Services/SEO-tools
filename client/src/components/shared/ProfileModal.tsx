import { useState } from 'react';

interface ProfileModalProps {
    mode: 'create' | 'edit';
    onSubmit: (data: any) => void; // Adjust the type of data as needed
}

const ProfileModal: React.FC<ProfileModalProps> = ({ mode, onSubmit }) => {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
        handleClose();
    };

    return (
        <div>
            <button className={`btn ${mode === 'create' ? 'btn-primary' : 'btn-success btn-sm rounded-0'}`} type="button" onClick={handleShow} data-toggle="tooltip" data-placement="top" title="Edit">
                {mode === 'create' ? 'Create Profile' : <i className="fa fa-pencil-square-o"></i>}
            </button>

            <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex={-1} style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{mode === 'create' ? 'Create a Profile' : 'Edit Profile'}</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleFormSubmit}>
                                <div className="row mb-3">
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name" className="form-label">Name:</label>
                                            <input type="text" className="form-control" id="name" name="name" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone" className="form-label">Phone:</label>
                                            <input type="tel" className="form-control" id="phone" name="phone" />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="email" className="form-label">Email:</label>
                                            <input type="email" className="form-control" id="email" name="email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="url" className="form-label">URL:</label>
                                            <input type="url" className="form-control" id="url" name="url" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="comment" className="form-label">Comment:</label>
                                    <textarea className="form-control" id="comment" name="comment" rows={4}></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">{mode === 'create' ? 'Create Profile' : 'Save Changes'}</button>
                            </form>
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

export default ProfileModal;
