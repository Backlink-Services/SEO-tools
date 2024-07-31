
import ProfileModal from '../layouts/ProfileModal';

const CreateProfile: React.FC = () => {
    const handleCreateSubmit = (data: any) => {
        console.log('Create Profile Data:', data);
    };

    return (
        <>
            <ProfileModal mode="create" onSubmit={handleCreateSubmit} />
        </>
    );
}

export default CreateProfile;
