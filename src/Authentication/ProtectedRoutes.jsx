import React from 'react'
import { Navigate  } from 'react-router-dom';


const ProtectedAuthRoute = ({isLoggedIn, redirectPath = '/workspace', children}) => {
    if (isLoggedIn) {
        return <Navigate to={redirectPath} replace />;
      }
    
      return children;
}

export default ProtectedAuthRoute