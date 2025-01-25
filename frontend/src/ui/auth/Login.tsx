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


  // const handleLogout = async()=>{
  //   try{

  //     const userFromDB = await axiosInstance.get("/api/auth/logout")
  //     console.log(userFromDB)

  //   }catch(err){
  //     console.log(err);
  //   }
  // }

  return (
    <>
      <div className='border-2 border-red-300 h-screen bg-slate-700 p-6'>
        
        <section>
          Welcome
        </section>

      

          <form onSubmit={handleSubmit(handleLogin)} className={`border-2 border-yellow-800  flex flex-col justify-center items-center gap-5 p-3 `}>

            {/* <div className='border-2 border-red-600 '> */}
          
              
                <label>

                  {/* <span>fullname</span> */}
                  {/* <input type="text" {...register('fullName')}  placeholder="Full Name" className="input input-md focus:outline-0 " /> */}

                  <Input {...register('fullName')} placeholder="Full Name" />

                  {errors.fullName && (<div className='text-red-500'>{errors.fullName.message}</div>)}


                </label>

                <label>

                {/* <span>citizenship </span> */}
                {/* <input type="text" {...register('citizenshipNum')}  placeholder="citizenship" className="input input-md focus:outline-0 " /> */}
                <Input {...register('citizenshipNum')} placeholder="citizenship" />


                {errors.citizenshipNum && (<div className='text-red-500'>{errors.citizenshipNum.message}</div>)}

                </label>


                <label>

                  {/* <span>password</span> */}
                  {/* <input type="text" {...register('password')}  placeholder="Password" className="input input-md focus:outline-0 " /> */}
                <Input {...register('password')} placeholder="Password" />

                  

                  {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}

                </label>
              {/* </div> */}

            
              <Button type='submit'>Login</Button>
              <Button onClick={()=> navigate('/signup')}>signup</Button>


              {errors.root && (<div className='text-red-500'>{errors.root.message}</div>)}
            


              
            
            
            </form>

            

            
        


      </div>


    </>
  )
}

export default Login