
import { useUser } from '../hooks/useUser'
import { Navigate,Outlet } from 'react-router-dom';


function ProtectedRoutes() {
   const { data: userData, isLoading, isError } = useUser()

   if (isLoading) {
     return (
       <div className='w-full h-screen flex justify-center items-center animate-[breathe_1.5s_ease-in-out_infinite]'>
         Loading...
       </div>
     )
   }

   if (!userData || isError) {
     return <Navigate to='/sign-in' replace />
   }

   return <Outlet />
}

export default ProtectedRoutes
