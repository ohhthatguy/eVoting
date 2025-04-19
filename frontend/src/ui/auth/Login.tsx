import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AuthContext } from '../../context/auth'
import {useContext} from 'react'

import { loginType, loginSchema } from './zod-schema'
import { useNavigate } from 'react-router-dom'

import { axiosInstance } from '../../utils/axios'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


// import { aunthenticatedUser } from '../../utils/ProtectedRoutes'

const Login = () => {
  const user = useContext(AuthContext)
  // const [admin, setAdmin] = useState<boolean>(false)
  const navigate = useNavigate()

  const {register, handleSubmit, setError, formState:{errors, isSubmitting}} = useForm<loginType>({
    
    resolver: zodResolver(loginSchema)
  })

 

  const handleLogin: SubmitHandler<loginType> = async(data)=>{
    console.log(data)

    try{

      const userFromDB = await axiosInstance.post("/api/auth/login", data)
      console.log(userFromDB)
      userFromDB.data.role === 'admin' ? navigate("/admin"): (userFromDB.data.role === 'citizen' ? navigate("/citizen") : navigate('/'))

    }catch(err:any){
      
      console.log(err)
        if( err.response.data.message ===  " invalid citizenship number "){
           setError("citizenshipNum", {
            message:  " invalid citizenship number "
           })
        }

        if(err.response.data.message === " invalid password "){
          setError("password", {
            message: " invalid password "
          })
        }

    }
  }


 

  return (
    <>
      <div className='h-screen bg-gradient-to-r from-blue-700 to-blue-900 p-6 flex justify-center items-center'>
        

        <div className=' bg-slate-700  flex flex-col justify-center items-center gap-5 p-2 rounded-lg '>     

          <div className=' w-full '>
            
            <h1 className='text-3xl font-bold text-white'>Login</h1>

            <div className=' text-lg font-light text-white'>Welcome Back! Please Login to your Account. </div>


          </div>

          <form onSubmit={handleSubmit(handleLogin)} className=' w-full flex flex-col gap-8 p-3'>

          
          
              
                <div >

                  <label className='font-semibold text-white'>FullName</label>
                  
                  <Input {...register('fullName')} placeholder="Full Name" />

                  {errors.fullName && (<div className='text-red-500'>{errors.fullName.message}</div>)}


                </div>

                <div>

                <label className='font-semibold text-white'>CitizenShip Number</label>

                <Input {...register('citizenshipNum')} placeholder="citizenship" />


                {errors.citizenshipNum && (<div className='text-red-500'>{errors.citizenshipNum.message}</div>)}

                </div>


                <div>

                <label className='font-semibold text-white'>Password</label>

                <Input {...register('password')} placeholder="Password" />

                  

                  {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}

                </div>
                  

              <Button type='submit'>Login</Button>
              
              
              <div>
                New user? <span className='font-bold text-white hover:cursor-pointer hover:text-yellow-300 ' onClick={()=> navigate('/signup')}> Create a New Account</span>
              
              </div>
            

              {errors.root && (<div className='text-red-500'>{errors.root.message}</div>)}
            
      
            </form>

            
        </div>
            
        


      </div>


    </>
  )
}

export default Login