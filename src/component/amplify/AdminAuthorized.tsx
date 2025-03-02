import { getCurrentUser } from "aws-amplify/auth";
import { getMemberDetail } from "function/amplify/rest/member";
import { createContext, Fragment, ReactNode, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


interface IAdminAuthorizedProps {
  children: ReactNode,
}

const UserContext = createContext<Record<string, any>>({});

const AdminAuthorized = ({children}: IAdminAuthorizedProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [userAttributes, setUserAttributes] = useState<Record<string, any>>({});
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    getCurrentUser().then((user) => {
      if (user) {
        getMemberDetail(user.username).then((attributes) => {
          if (attributes.user && attributes.user.userGroups.includes('ADMIN')) {
            setIsAdmin(true);
            setUserAttributes(attributes.user);
            setLoading(false);
          } else {
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, isAdmin]);
  
  return (
    <Fragment>
      {loading ? <div>Loading...</div> : (isAdmin ? 
        <UserContext.Provider value={{ userAttributes }}>
          {children}
        </UserContext.Provider>
     : <div>Unauthorized</div>)}
    </Fragment>
  )
}

export default AdminAuthorized;
export const useUser = () => useContext(UserContext);
