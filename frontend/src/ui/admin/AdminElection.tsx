import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'

import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { electionCreationSchema, electionCreationType } from './zod-schema-admin'

import { AuthContext } from '../../context/auth'
import { axiosInstance } from '@/utils/axios'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const AdminElection = () => {
  const user = useContext(AuthContext)
  const navigate = useNavigate()

  const { register, control, handleSubmit, formState:{errors, isSubmitting} } = useForm<electionCreationType>({
    resolver: zodResolver(electionCreationSchema),
    defaultValues: {
      candidate: [{ name: '', partyName: '', partyLogo: '', profile: '' , vote: 0}],
      createdBy: user?.user?.fullName,
      adminCitizenshipNum : user?.user?.citizenshipNum
  },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'candidate',
    control,
   
  })


  const saveElectionCreation: SubmitHandler<electionCreationType>  = async(data)=>{
    // console.log(data)

    try{
      const res = await axiosInstance.post("/admin/election/createNew", data)
      console.log(res)
      navigate('/admin')


    }catch(err:any){
      console.log(err)
      if(err?.status == '401'){
          console.log(err?.data?.message)
          user?.setUser(undefined)
      }

    }
  }

// console.log(errors)
// handle from here
  return (<>
        <div className='bg-slate-700 h-screen'>

            <div>{`Election Creating By ${user?.user?.fullName}`}</div>

          <div>
            <form onSubmit={handleSubmit(saveElectionCreation)}>

              <Input placeholder='election title' {...register('electionTitle')} />
              {errors && errors.electionTitle && <div className='text-red-500'>{errors?.electionTitle.message}</div>}

              <div className='border-2 border-red-300 p-4'>
                {
                  
                  fields.map((fields, index)=>(
                    <div key={fields.id}>
                        <Input placeholder='candidate Name' {...register(`candidate.${index}.name`)}/>
                        {errors?.candidate && errors.candidate[index]?.name && <div className='text-red-500'>{errors?.candidate[index]?.name.message}</div>}

                        <Input placeholder='Party Name' {...register(`candidate.${index}.partyName`)}/>
                        {errors?.candidate && errors.candidate[index]?.partyName && <div className='text-red-500'>{errors?.candidate[index]?.partyName.message}</div>}

                        
                        <Input placeholder='candidate profile' {...register(`candidate.${index}.profile`)}/>

                        {errors?.candidate && errors.candidate[index]?.profile && <div className='text-red-500'>{errors?.candidate[index]?.profile.message}</div>}
                        
                        <Input placeholder='party logo' {...register(`candidate.${index}.partyLogo`)}/>

                        {errors?.candidate && errors.candidate[index]?.partyLogo && <div className='text-red-500'>{errors?.candidate[index]?.partyLogo.message}</div>}
                        {/* <Input placeholder='vote'/> */}

                        {/* <Input placeholder='vote' {isN} {...register(`candidate.${index}.vote`)}/>
                        {errors?.candidate && errors.candidate[index]?.vote && <div className='text-red-500'>{errors?.candidate[index]?.vote.message}</div>} */}


                        <Button variant={'outline'} type='button' onClick={()=> remove(index)}>remove</Button>

                    </div>

                  ))
                }
                

                  <div className='border-2 border-green-400 flex justify-between'>

                  <Button type='button' variant={'outline'} onClick={()=> append({name: "", partyName: "", partyLogo: "", profile: "", vote: 0})}>Add</Button>


                </div>

              </div>

                

              {/* <Button type='submit' className='hover:cursor-pointer hover:scale-110 active:scale-100'>Submit!</Button> */}

              <Button type="submit" disabled={isSubmitting} className="hover:cursor-pointer hover:scale-110 active:scale-100">
          {isSubmitting ? 'Submitting...' : 'Submit!'}
        </Button>

            </form>
            {errors?.root && errors.root.message && <div className='text-red-500'>{errors.root.message}</div>}
          </div>

          {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
          
        </div>
  </>)
}

export default AdminElection