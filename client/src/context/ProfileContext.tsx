import React, { createContext, useState, ReactNode } from 'react';
import ProfileData from '../data/ProfileData';

export interface Profile {
  id: number;
  name: string,
  url: string,
  phone: string,
  email: string,
  comment: string,
}

export interface ProfileContextType {
  profiles: Profile[] | null;
}

interface ProfileProviderProps {
  children: ReactNode;
}

// Create a context
const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {
  const [profiles, setProfiles] = useState<Profile[] | null>(ProfileData);

  return (
    <ProfileContext.Provider value={{ profiles }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;