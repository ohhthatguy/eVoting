import {  useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AuthContext } from './context/auth'

import './App.css'
import Homepage from './ui/Homepage'
import Header from './ui/Header/Header'
import Login from './ui/auth/Login'
import Signup from './ui/auth/Signup'
import NotFound from './ui/error/NotFound'
import ProtectedRoutes from './utils/ProtectedRoutes'
import CitizenHomePage from './ui/citizen/CitizenHomePage'
import CitizenElectionPage from './ui/citizen/CitizenElectionPage'
import AdminElection from './ui/admin/AdminElection'
import AdminHomePage from './ui/admin/AdminHomePage'
import History from './ui/History'


function App() {
  // const [count, setCount] = useState(0)
  const user = useContext(AuthContext);
  console.log(user?.user)


  return (
    <>

      <Header/>

      <Routes>

        <Route path='/' element={<Homepage/>} />

        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>

   
        

        <Route element={<ProtectedRoutes />}>
          

            <Route path='/citizen' element={ (user?.user && user.user.role === "citizen") && <CitizenHomePage /> } />
            <Route path='/election' element={ (user?.user && user.user.role === "citizen") && <CitizenElectionPage /> } />

            
            <Route path='/admin' element={ (user?.user && user.user.role === "admin") && <AdminHomePage />} />
            <Route path='/admin-election' element={ (user?.user && user.user.role === "admin") && <AdminElection />} />

            <Route path='/history' element={<History />} />
        
        </Route>

        <Route path='*' element={<NotFound/>} />
      </Routes>
    </>
  )
}

export default App
