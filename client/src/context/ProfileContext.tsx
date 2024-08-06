import React, { createContext, useState, useEffect, ReactNode } from 'react';
// import ProfileData from '../data/ProfileData';
import axios from 'axios';

// DATA
export interface Profile {
  id: number;
  name: string,
  url: string,
  phone: string,
  email: string,
  comment: string,
}

// CONTEXT
export interface ProfileContextType {
  profiles: Profile[] | null;
  addProfile?: (profile: Profile) => void;
  editProfile?: (profile: Profile) => void;
  isLoading: boolean;
  error: string | null;
}

interface ProfileProviderProps {
  children: ReactNode;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/seo/profiles');
        setProfiles(response.data.profiles);
        console.log(response.data.profiles);
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const addProfile = (profile: Profile) => {
    setProfiles((prevProfiles) => (prevProfiles ? [profile, ...prevProfiles] : [profile]));
  };

  const editProfile = (updatedProfile: Profile) => {
    setProfiles((prevProfiles) =>
      prevProfiles ? prevProfiles.map(profile => (profile.id === updatedProfile.id ? updatedProfile : profile)) : [updatedProfile]
    );
  };

  const contextValue = {
    profiles,
    addProfile,
    editProfile,
    isLoading,
    error,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
