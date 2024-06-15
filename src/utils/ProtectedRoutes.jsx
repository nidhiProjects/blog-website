import React from 'react'
import { Navigate } from 'react-router-dom';


const ProtectedRoutes = ({children}) => {
    const user=sessionStorage.getItem("user");
  return (
    <div>
      {
        user ? children : <Navigate to="/login"/>
      }
    </div>
  )
}

export default ProtectedRoutes
