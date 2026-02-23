
import { useUser } from '../hooks/useUser'
import { Navigate,Outlet } from 'react-router-dom';


function ProtectedRoutes() {
    const { data: userData } = useUser()
  

  return userData ? <Outlet /> : <Navigate to='/sign-in' />

}

export default ProtectedRoutes
