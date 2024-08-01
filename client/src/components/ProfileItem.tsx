import ProfileOptions from "./shared/ProfileOptions"
import { Profile } from "../context/ProfileContext"

const ProfileItem: React.FC<{ profile: Profile }> = (props) => {
    return (
        <tr key={props.profile.id}>
            <th scope="row">{props.profile.id}</th>
            <td className="text-truncate" style={{ maxWidth: '150px' }}>{props.profile.name}</td>
            <td className="text-truncate" style={{ maxWidth: '200px' }}>
                <a href={props.profile.url} target="_blank" rel="noopener noreferrer">
                    {props.profile.url}
                </a>
            </td>
            <td className="d-flex justify-content-end">
                <ProfileOptions />
            </td>
        </tr>
    )
}

export default ProfileItem
