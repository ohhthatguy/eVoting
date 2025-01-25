import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth"
import { axiosInstance } from "../../utils/axios"



const Header = () => {

  const users = useContext(AuthContext)
  console.log(users)
  
  const navigate = useNavigate()
  

  const handleLogIn = ()=>{
   navigate('/login') 
  }


  const handleLogOut = async()=>{
      try{
         await axiosInstance.get("/api/auth/logout");
         users?.setUser(undefined)
         navigate('/')

      }catch(err){
        console.log(err)
      }
   }


  return (
    <header className="border-2 flex justify-between bg-red-900 border-amber-300 p-2.5">

        <div onClick={()=> (users?.user && users.user.role === "citizen") ? navigate('/citizen') : ((users?.user && users.user.role === "admin") ? navigate('/admin') : navigate('/')) }>e-Voting</div>

        <nav className="flex justify-around w-[20%]">

            <span className="hover:cursor-pointer hover:scale-110 active:scale-100 " onClick={()=> navigate('about')}>About</span>

            <span className="hover:cursor-pointer hover:scale-110 active:scale-100" onClick={ users?.user && users.user  ? handleLogOut : handleLogIn}> {(users?.user && users.user) ? 'logout' : 'login'}</span>

        </nav>

    </header>
  )
}

export default Header