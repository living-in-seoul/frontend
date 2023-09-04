'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface UserContextProps {
  user: any; // 유저의 타입에 따라서 변경해주세요
  status: number | null;
}

export const UserContext = createContext<UserContextProps | null>(null);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<boolean>(false);
  const [status, setStatus] = useState<number | null>(null);

  const verifyAndRefreshToken = async () => {
    const verify = await fetch('/api/user');
    setStatus(verify.status);

    if (verify.status === 200 || verify.status === 201) {
      setUser(true);
    }
  };

  useEffect(() => {
    verifyAndRefreshToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, status }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
