import { useContext } from "react"
import ProfileItem from "./ProfileItem"
import ProfileContext, { ProfileContextType } from "../context/ProfileContext"

const ProfileList = () => {
    const { profiles } = useContext(ProfileContext) as ProfileContextType;
    return (
        <div className="row mt-4">
            <div className="col-12">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">URL</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {profiles?.map((profile) => (
                            <ProfileItem
                                key={profile.id}
                                profile={profile}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProfileList
