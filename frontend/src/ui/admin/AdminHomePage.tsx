import {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../context/auth'
import { useNavigate } from 'react-router-dom'

import { axiosInstance } from '@/utils/axios'
import { electionCreationType } from './zod-schema-admin'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const AdminHomePage = () => {
  const user = useContext(AuthContext)
const navigate = useNavigate()

const [electionData, setElectionData] = useState<electionCreationType[]>() 
const [selectedElection, setSelectedElection] = useState<electionCreationType[]>()
const [updateElectionData, setUpdateElectionData] = useState<boolean>(false)

  
  useEffect(()=>{
    const getElectionData = async()=>{
      try{
  
        const res = await axiosInstance.post("/admin/election/getElectionData", user?.user)
  
        if(!res){
          console.log("no election found")
          throw new Error("no elction found")
        }
        setElectionData(res.data.data)
        console.log(res)
  
      }catch(err:any){
        console.log(err)

        if(err.status == '401' && err.response.data.message == " unauthorized user - no token found "){
          console.log(" unauthorized user - no token found ")
          user?.setUser(undefined)
        }
      }
    }
    getElectionData()
  },[updateElectionData])

  console.log(electionData)
  console.log(updateElectionData)
  // console.log( electionData &&  )

  const handleMovingElectionDataToHistory = async(e:any)=>{
    try{

      const res = await axiosInstance.post("/admin/election/moveToHistory", e)

      if(!res){
        console.log("nothing happend")
      }
      console.log(res)
      setUpdateElectionData(prev=> !prev)
      setSelectedElection(undefined)


    }catch(err:any){
      console.log(err)
      
      if(err.status == '401' && err.response.data.message == " unauthorized user - no token found "){
        console.log(" unauthorized user - no token found ")
        user?.setUser(undefined)
      }
    }
  }

  



  return (
    <div className='bg-slate-700 h-screen'>

      <div>
        {`Welcome Admin, mr. ${user?.user?.fullName}`}
      </div>

      <div>

        {
          (electionData && electionData.length > 0) ?
            
            electionData.map((e,index)=>(
                <div key={index} className='bg-red-400 w-44 h-24 hover:cursor-pointer hover:scale-105 active:scale-100' onClick={()=> setSelectedElection([e])}>
                   <div className='text-2xl '>{e.electionTitle}</div>

                   <div>{`createdBy: ${e.createdBy}`}</div>
                </div>
            ))

            :

            <div> no election for now </div>
            
        }


     

      <Button className="btn btn-wide focus:outline-0" onClick={()=> navigate("/admin-election")}>election creation</Button>


        

      </div>

      <div>

        {
          (selectedElection && selectedElection.length >0) && <div>
            
            {
              selectedElection.map((e)=>(

              <Table>
                <TableCaption>{`Election: ${e.electionTitle}`}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">candidate Name</TableHead>
                    <TableHead>Party Name</TableHead>
                    {/* <TableHead>Method</TableHead> */}
                    <TableHead className="text-right">Vote</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {

                    e.candidate.map((ele,index)=>(
                      <TableRow key={index}>
                    <TableCell className="font-medium">{ele.name}</TableCell>
                    <TableCell>{ele.partyName}</TableCell>
                    {/* <TableCell>Credit Card</TableCell> */}
                    <TableCell className="text-right">{ele.vote}</TableCell>
                  </TableRow>
                    ))

                  }
                  
                </TableBody>
                <div>
                  <Button className=' hover:cursor-pointer hover:scale-105 active:scale-100' onClick={()=>handleMovingElectionDataToHistory(e)}>Finish this election!</Button>
                </div>
              </Table>


              ))
            }
          </div>
        }
      </div>


    </div>
  )
}

export default AdminHomePage