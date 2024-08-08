import { useContext } from "react";
import ProfileModal from "./ProfileModal"
import ProfileContext, { ProfileContextType } from "../../context/ProfileContext";

const ProfileOptions: React.FC<{ profileId: string }> = ({ profileId }) => {
    const { deleteProfile } = useContext(ProfileContext) as ProfileContextType;

    const handleEdit = (data: any) => {
        // if (editProfile) {
        //     editProfile(data);
        // }
        console.log('Editing Profile Data:', data);
    };

    const handleDelete = () => {
        if (deleteProfile) {
          deleteProfile(profileId);
        }
        console.log('Deleted Profile ID:', profileId);
      };

    return (
        <div>
            <ul className="list-inline m-0">
                <li className="list-inline-item">
                    <ProfileModal mode="edit" onSubmit={handleEdit} />
                </li>
                <li className="list-inline-item">
                    <button className="btn btn-danger btn-sm rounded-0" onClick={handleDelete} type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
                </li>
            </ul>
        </div>
    )
}

export default ProfileOptions
