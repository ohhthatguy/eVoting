import {Outlet, Navigate} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth'

import { axiosInstance } from './axios'

const ProtectedRoutes = () => {

// let verifieds;

const user = useContext(AuthContext)
const [loading, setLoading] = useState(true); 

useEffect(() => {
  const verifying = async () => {
      try {
          const verified = await axiosInstance.get('/api/auth/authenticate');
          user?.setUser(verified.data);
      } catch (err) {
          console.error('Verification error:', err);

          if(err && err.status && err.status == "401"){
            user?.setUser(undefined)
          }
          
      } finally {
          setLoading(false); 
      }
  };
console.log("runnign")
  verifying();
}, []);



if (loading) {
  return <div>Loading...</div>; // Render loading indicator while verifying
}


  console.log(user?.user && user.user)
 

  return ((user?.user && user.user) ? <Outlet /> : <Navigate replace to='/' />)  

}

export default ProtectedRoutes

