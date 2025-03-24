import '@/amplifyConfigure';
import { fetchUserAttributes, getCurrentUser } from 'aws-amplify/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { Hub } from 'aws-amplify/utils';

interface IAuthorizedProps {
  authorized: React.ReactNode,
  unauthorized: React.ReactNode,
}

const UserContext = createContext<Record<string, any> | null>(null);

const Authorized = ({authorized: authorizedElement, unauthorized: unauthorizedElement}: IAuthorizedProps) => {
  const [userAttributes, setUserAttributes] = useState<Record<string, any>>({});
  const [signedIn, setSignedIn] = useState(false);

  const checkSignIn = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        const attributes = await fetchUserAttributes();
        setUserAttributes(attributes);
        setSignedIn(true);
      } else {
        setUserAttributes({});
        setSignedIn(false);
      }
    } catch {
      setUserAttributes({});
      setSignedIn(false);
    }
  };
  
  useEffect(() => {
    const listener = () => {
      checkSignIn();
    };

    Hub.listen("auth", listener);
    checkSignIn();
  }, []);
  
  return (
    <UserContext.Provider value={{ userAttributes }}>
      {signedIn ? authorizedElement : unauthorizedElement}
    </UserContext.Provider>
  )
}

export default Authorized;
export const useUser = () => useContext(UserContext);
