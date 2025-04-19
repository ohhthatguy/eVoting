import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AuthContext } from '../../context/auth'
import {useContext} from 'react'

import { signupType, signupSchema } from './zod-schema'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../utils/axios'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Signup = () => {
  const user = useContext(AuthContext)
  const navigate = useNavigate()
  

  const {register, handleSubmit, setError, formState:{errors, isSubmitting}} = useForm<signupType>({
    resolver: zodResolver(signupSchema),
    
  })

 

  const handleSignup: SubmitHandler<signupType> = async(data)=>{

    console.log(data)

    // /singup is used for role=citizen
    const role = (user?.admin) ? "admin" : "citizen";
    
    
    const {citizenshipNum, fullName, password, phoneNum} = data

    const dataToPost = {citizenshipNum, fullName, password, phoneNum, role}
      try{
        const temp = await axiosInstance.post("/api/auth/signup", dataToPost)
        console.log(temp)
        navigate('/login')

      }catch(err:any){
        console.log(err)
        if( err.response.data.message === " This citizenship number is already on use! "){
           setError("citizenshipNum", {
            message: " This citizenship number is already on use!"
           })
        }
      }
    
  }

  return (
    <>
      <div className='border-2 border-red-300 h-screen bg-slate-700 bg-gradient-to-r from-blue-700 to-blue-900 p-6 flex justify-center items-center'>
        
       <div className=' bg-slate-700  flex flex-col justify-center items-center gap-2 p-2 rounded-lg '>

       <div className=' w-full p-4 flex justify-between'>
            <div>
            <h1 className='text-3xl font-bold text-white'>SignUp</h1>

            <div className=' text-lg font-light text-white'> Please Signup with correct credentials. </div>
            </div>
            <div className='text-white'>back to <span className='font-bold text-white hover:cursor-pointer hover:text-yellow-300 ' onClick={()=> navigate('/login')}>login</span></div>

          </div>

          <form onSubmit={handleSubmit(handleSignup)} className=' w-full flex flex-col gap-3 p-3'>

  
                <div>

                 
                  <label className='text-white font-bold'>FullName</label>
                  <Input {...register('fullName')}  placeholder="Full Name" />

                  {errors.fullName && (<div className='text-red-500'>{errors.fullName.message}</div>)}


                </div>

                <div>

                <label className='text-white font-bold'>CitizenShip Number</label>


                    <Input {...register('citizenshipNum')}  placeholder="citizenship" />

                    {errors.citizenshipNum && (<div className='text-red-500'>{errors.citizenshipNum.message}</div>)}

                </div>

                <div>

                <label className='text-white font-bold'>Phone Number</label>


                    <Input {...register('phoneNum')}  placeholder="Phone Number" />

                    {errors.phoneNum && (<div className='text-red-500'>{errors.phoneNum.message}</div>)}

                </div>

                <div>

                <label className='text-white font-bold'>Password</label>

                    <Input {...register('password')}  placeholder="Password" />

                    {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}

                </div>

                <div>

                <label className='text-white font-bold'>Confirm Password</label>


                    <Input {...register('confirmPassword')}  placeholder="confirm password"  />

                    {errors.confirmPassword && (<div className='text-red-500'>{errors.confirmPassword.message}</div>)}

                </div>


                <Button disabled={isSubmitting} type='submit'>{isSubmitting ? "submitting" : "submit"}</Button>


            <div className=''>
              
              


              {errors.root && (<div className='text-red-500'>{errors.root.message}</div>)}
              
              <div>
                <Button onClick={()=> user?.setAdmin(prev=> !prev)}> {(user?.admin) ? "signingup as admin" : "signingup as citizen"}</Button>
              </div>
              
              </div>

            </form>
        
        
        </div>


      </div>

    </>
  )
}

export default Signup