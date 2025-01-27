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
      <div className='border-2 border-red-300 h-screen bg-slate-700 p-6'>
        
        <section>
          Welcome
        </section>

          <form onSubmit={handleSubmit(handleSignup)} className={`border-2  border-yellow-800  flex flex-col justify-center items-center gap-5 p-3 ${user?.admin && "bg-indigo-600"  }`}>

            {/* <div className='border-2 border-red-600 '> */}
          
              
                <label>

                  {/* <span>fullname</span> */}
                  {/* <input type="text" {...register('fullName')}  placeholder="Full Name" className="input input-md focus:outline-0 " /> */}

                  <Input {...register('fullName')}  placeholder="Full Name" />

                  {errors.fullName && (<div className='text-red-500'>{errors.fullName.message}</div>)}


                </label>

                <label>

                {/* <span>citizenship </span> */}
                    {/* <input type="text" {...register('citizenshipNum')}  placeholder="citizenship" className="input input-md focus:outline-0 " /> */}

                    <Input {...register('citizenshipNum')}  placeholder="citizenship" />

                    {errors.citizenshipNum && (<div className='text-red-500'>{errors.citizenshipNum.message}</div>)}

                </label>


              

                <label>

                {/* <span>password</span> */}
                    {/* <input type="text" {...register('phoneNum')}  placeholder="Phone Number" className="input input-md focus:outline-0 " /> */}

                    <Input {...register('phoneNum')}  placeholder="Phone Number" />

                    {errors.phoneNum && (<div className='text-red-500'>{errors.phoneNum.message}</div>)}

                </label>

                <label>

                {/* <span>password</span> */}
                    {/* <input type="text" {...register('password')}  placeholder="Password" className="input input-md focus:outline-0 " /> */}

                    <Input {...register('password')}  placeholder="Password" />

                    {errors.password && (<div className='text-red-500'>{errors.password.message}</div>)}

                </label>

                <label>

                {/* <span>password</span> */}
                    {/* <input type="text" {...register('confirmPassword')}  placeholder="confirm password" className="input input-md focus:outline-0 " /> */}

                    <Input {...register('confirmPassword')}  placeholder="confirm password"  />

                    {errors.confirmPassword && (<div className='text-red-500'>{errors.confirmPassword.message}</div>)}

                </label>






              {/* </div> */}

            
              <Button disabled={isSubmitting} type='submit'>{isSubmitting ? "submitting" : "submit"}</Button>
              <Button onClick={()=> navigate('/login')}>login</Button>


              {errors.root && (<div className='text-red-500'>{errors.root.message}</div>)}
            
              <Button onClick={()=> user?.setAdmin(prev=> !prev)}> {(user?.admin) ? "signingup as admin" : "signingup as citizen"}</Button>

            </form>

      </div>

    </>
  )
}

export default Signup