import { Fragment, ReactNode } from "react"
import { useAuth } from "../commom/AuthContext";

interface IAdminAuthorizedProps {
  children: ReactNode,
}

const AdminAuthorized = ({children}: IAdminAuthorizedProps) => {
  const auth = useAuth();
  const user = auth.user;
  
  return (
    <Fragment>
      {user ? (user.userGroups.includes('Admin') ? children : null ) : null}
    </Fragment>
  )
}

export default AdminAuthorized;
