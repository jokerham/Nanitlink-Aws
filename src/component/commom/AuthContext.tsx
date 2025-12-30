import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { CognitoUser } from '@/function/amplify/rest/member/types';
import { getMemberDetail } from '@/function/amplify/rest/member';
import { Hub } from 'aws-amplify/utils';

interface AuthContextType {
  user: CognitoUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      setLoading(true);
      getCurrentUser()
        .then((amplifyUser) => getMemberDetail(amplifyUser?.userId || ''))
        .then((memberDetail) => setUser(memberDetail.user))
        .catch((err) => setUser(null))
        .finally(() => setLoading(false));
    };
  
    loadUser(); // run once on mount
  
    const unsubscribe = Hub.listen('auth', (data) => {
      const { event } = data.payload;
      if (
        event === 'signedIn' ||
        event === 'signedOut' ||
        event === 'tokenRefresh' ||
        event === 'tokenRefresh_failure'
      ) {
        loadUser();
      }
    });
  
    return () => {
      unsubscribe(); // cleanup on unmount
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// utils/guestId.ts
export const getGuestId = (): string => {
  const KEY = 'guest-id';
  let guestId = localStorage.getItem(KEY);
  if (!guestId) {
    guestId = 'guest-' + crypto.randomUUID();
    localStorage.setItem(KEY, guestId);
  }
  return guestId;
};