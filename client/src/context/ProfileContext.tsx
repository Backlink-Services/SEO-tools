import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import ProfileData from '../data/ProfileData';
import axios from 'axios';

// DATA
export interface Profile {
  _id: string
  name: string
  url: string
  phone: string
  email: string
  comment: string
}

// CONTEXT
export interface ProfileContextType {
profiles: Profile[] | null;
  addProfile?: (profile: Profile) => void;
  editProfile?: (profile: Profile) => void;
  deleteProfile?: (id: string) => void;
  isLoading: boolean;
  error: string | null;
}

interface ProfileProviderProps {
  children: ReactNode
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const ProfileProvider: React.FC<ProfileProviderProps> = ({
  children,
}) => {
  const [profiles, setProfiles] = useState<Profile[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/seo/profiles');
        setProfiles(response.data.profiles);
        console.log(response.data.profiles);
      } catch (error) {
        setError('Failed to fetch data')
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfiles();
  }, [profiles?.length]);

  const addProfile = async (profile: Profile) => {
    try {
      const response = await axios.post('http://localhost:8080/seo/profiles', profile);
      const newProfile = response.data;
      console.log(newProfile);
      setProfiles((prevProfiles) => (prevProfiles ? [...prevProfiles, newProfile] : [newProfile]));
    } catch (error) {
      console.error('Error adding profile:', error);
      setError('Failed to add profile');
    }
  };

  // const editProfile = (updatedProfile: Profile) => {
  //   setProfiles((prevProfiles) =>
  //     prevProfiles ? prevProfiles.map(profile => (profile.id === updatedProfile.id ? updatedProfile : profile)) : [updatedProfile]
  //   );
  // };

  const deleteProfile = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/seo/profiles/${id}`);
      setProfiles((prevProfiles) => (prevProfiles ? prevProfiles.filter(profile => profile._id !== id) : null));
    } catch (error) {
      console.error('Error deleting profile:', error);
      setError('Failed to delete profile');
    }
  };

  const contextValue = {
    profiles,
    addProfile,
    // editProfile,
    deleteProfile,
    isLoading,
    error,
  }

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  )
}

export default ProfileContext
