import React, { createContext, useState, useEffect, ReactNode } from 'react';
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
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('https://your-api-endpoint');
        setProfiles(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const contextValue = {
    profiles,
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
