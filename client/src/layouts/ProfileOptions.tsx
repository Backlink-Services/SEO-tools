import ProfileModal from "./ProfileModal"

const ProfileOptions = () => {
    const handleEditSubmit = (data: any) => {
        console.log('Editing Profile Data:', data);
    };

    return (
        <div>
            <ul className="list-inline m-0">
                {/* <li className="list-inline-item">
                    <button className="btn btn-primary btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Add"><i className="fa fa-table"></i></button>
                </li> */}
                {/* <li className="list-inline-item">
                    <button className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-pencil-square-o"></i></button>
                </li> */}
                <li className="list-inline-item">
                    <ProfileModal mode="edit" onSubmit={handleEditSubmit}/>
                </li>
                <li className="list-inline-item">
                    <button className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
                </li>
            </ul>
        </div>
    )
}

export default ProfileOptions
