import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'

import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { electionCreationSchema, electionCreationType } from './zod-schema-admin'

import { AuthContext } from '../../context/auth'
import { axiosInstance } from '@/utils/axios'

import { useState, useEffect } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const AdminElection = () => {


  type profileSetter = {
    profileNum: number,
    url: string
  }

  type urlsFinalType = {
    profileURL: string,
    logoURL: string,
    index:number
  }

  const user = useContext(AuthContext)
  const navigate = useNavigate()
  const [profile,setProfile] = useState<profileSetter[]>([])
  const [urlsFinal, setUrlsFinal] = useState<urlsFinalType[]>([])
  let profileUrl:any, logoURl:any;

  

  

  const { register, control, handleSubmit, formState:{errors, isSubmitting} } = useForm<electionCreationType>({
    resolver: zodResolver(electionCreationSchema),
    defaultValues: {
      candidate: [{ name: '', partyName: '', partyLogo: 'partylogodefault', profile: 'profileDefault' , vote: 0}],
      createdBy: user?.user?.fullName,
      adminCitizenshipNum : user?.user?.citizenshipNum
  },
  })

  const { fields, append, remove } = useFieldArray({
    name: 'candidate',
    control,
   
  })

  // useEffect(()=>{

  //   const watchedFields = watch();
  //   const candidateProfiles = watchedFields.candidate.map(e => e.profile);
  //   console.log(candidateProfiles)
  //   // setCandidateProfiles(watchedFields.map(candidate => candidate.profile)); 

  // },[watch])


  const saveElectionCreation: SubmitHandler<electionCreationType>  = async(data)=>{
    console.log(data)
    console.log(urlsFinal)
    

     urlsFinal.map((e)=> {
      data.candidate[e.index].partyLogo = e.logoURL;
      data.candidate[e.index].profile = e.profileURL;

   } )

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

  const handleProfileChange = async(e:any, index:number, type:string)=>{
    console.log(e.target.files[0])

    //save to backend in /profile folder
    //if saved ? return the url back to forntend
    //save this url in profile field
    if(e.target.files[0] ){
      const formData = new FormData();
      formData.append('profile', e.target.files[0]);


      if(type == "profile"){

      
      //profile pic
      try{

        const res = await axiosInstance.post("/admin/election/uploadProfile", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if(!res){
          console.log("no response in profile")
          return 
        }

        profileUrl = res.data.url;


        // console.log(res)

      }catch(err:any){
          console.log(err)
          if(err?.status == '401'){
            console.log(err?.data?.message)
            user?.setUser(undefined)
        }
      }

    }


    if(type == "logo"){
      // logo
      try{

        const res = await axiosInstance.post("/admin/election/uploadProfile", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if(!res){
          console.log("no response in logo url")
          return 
        }
       
        logoURl = res.data.url
        // console.log(res)

      }catch(err:any){
          console.log(err)
          if(err?.status == '401'){
            console.log(err?.data?.message)
            user?.setUser(undefined)
        }
      }

    }

    console.log(logoURl)
    console.log(profileUrl)
      if(logoURl && profileUrl){
        
        setUrlsFinal(prev=> [...prev,{index: index, profileURL: profileUrl, logoURL: logoURl} ])

      }
      // return {profileUrl, logoURl}


    }


  }

  console.log(urlsFinal)

// console.log(profile)
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

                        <Input type='file' placeholder='Profile' onChange={(e)=> handleProfileChange(e,index, "profile")}/>
                       
                        {/* <Input type='text' hidden placeholder='candidate profile' {...register(`candidate.${index}.profile`)}/> */}

                        {errors?.candidate && errors.candidate[index]?.profile && <div className='text-red-500'>{errors?.candidate[index]?.profile.message}</div>}
                        
                        <Input type='file' placeholder='Logo' onChange={(e)=> handleProfileChange(e,index, "logo")}/>
                       
                        {/* <Input type='text' hidden placeholder='party logo' {...register(`candidate.${index}.partyLogo`)}/> */}

                        {errors?.candidate && errors.candidate[index]?.partyLogo && <div className='text-red-500'>{errors?.candidate[index]?.partyLogo.message}</div>}
                       


                        <Button variant={'outline'} type='button' onClick={()=> remove(index)}>remove</Button>

                    </div>

                  ))
                }
                

                  <div className='border-2 border-green-400 flex justify-between'>

                  <Button type='button' variant={'outline'} onClick={()=> append({name: "", partyName: "", partyLogo: "logoDefault", profile: "profileDefault", vote: 0})}>Add</Button>


                </div>

              </div>

                

              {/* <Button type='submit' className='hover:cursor-pointer hover:scale-110 active:scale-100'>Submit!</Button> */}

              <Button type="submit" disabled={isSubmitting} className="hover:cursor-pointer hover:scale-110 active:scale-100">
          {isSubmitting ? 'Submitting...' : 'Submit!'}
        </Button>

            </form>
            {errors?.root && errors.root.message && <div className='text-red-500'>{errors.root.message}</div>}
          </div>


           
          
          
        </div>
  </>)
}

export default AdminElection