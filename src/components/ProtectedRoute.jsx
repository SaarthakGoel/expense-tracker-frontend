import { Outlet , Navigate } from "react-router-dom"
import { selectCurrentToken } from "../features/auth/authSlice"
import { useSelector } from "react-redux"

const ProtectedRoute = () => {
 
  const token = useSelector(selectCurrentToken);

  if(!token) return <Navigate to='/login' />

  return <Outlet />
}

export default ProtectedRoute