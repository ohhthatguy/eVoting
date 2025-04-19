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
    <header className=" flex justify-between bg-blue-900 p-2.5">

        <div onClick={()=> (users?.user && users.user.role === "citizen") ? navigate('/citizen') : ((users?.user && users.user.role === "admin") ? navigate('/admin') : navigate('/')) } className="text-white hover:cursor-pointer " >
          
          <img src="elections.png" alt="e-Voting" width={30} height={30}/>
        </div>

        <nav className="flex justify-around w-[20%]">

      { users?.user !== undefined &&
        <span className="hover:cursor-pointer hover:scale-110 active:scale-100 text-white " onClick={()=> navigate('/history')}>History</span>
      }

            <span className="hover:cursor-pointer hover:scale-110 active:scale-100 text-white font-bold " onClick={()=> navigate('about')}>About</span>

            <span className="hover:cursor-pointer hover:scale-110 active:scale-100 text-white font-bold bg-red-700 w-24 text-center rounded" onClick={ users?.user && users.user  ? handleLogOut : handleLogIn}> {(users?.user && users.user) ? 'logout' : 'login'}</span>

        </nav>

    </header>
  )
}

export default Header