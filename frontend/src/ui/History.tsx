import {useState, useEffect} from 'react'
import { axiosInstance } from '@/utils/axios'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@/components/ui/button'

import { electionCreationType } from './admin/zod-schema-admin'
import { error } from 'console'

const History = () => {

    const [historyData, setHistoryData] = useState<electionCreationType[]>()
    const [isSelected, setIsSelected] = useState(false)
    const [selectedHistoryData, setSelectedHistoryData] = useState<electionCreationType[]>()

    useEffect(()=>{

        const getHistoricalElectionData = async()=>{
            try{

                const res = await axiosInstance.get("/admin/election/getHistory")
                if(!res){
                        throw new Error("no elction data found")
                    
                }
                // console.log(res)
                setHistoryData(res.data.data)
            }catch(err: any){
                console.log(err)

                // if(err.status == '401' && err.response.data.message == " unauthorized user - no token found "){
                //     console.log(" unauthorized user - no token found ")
                //     user?.setUser(undefined)
                //   }
            }
            
        }

        getHistoricalElectionData()
    },[]) 


    const handleData = (e:any)=>{
        setSelectedHistoryData([e])
        setIsSelected(true)
    }

  return (
    <div className='bg-slate-700 h-screen'>

        {

           (!isSelected) ?
           
           <div>
                <div>Election Archive</div>

                
                    {
                        (historyData && historyData?.length > 0) && <div>

                                {
                                    historyData.map((e,index)=>(
                                        
                                        <div key={index} className='bg-red-400 w-44 h-24 hover:cursor-pointer hover:scale-105 active:scale-100' onClick={()=> handleData(e)}>
                                        
                                            <div className='text-2xl '>{e?.electionTitle}</div>

                                            <div>{`createdBy: ${e?.createdBy}`}</div>
                                        </div>
                                        
                                    ))
                                }

                            </div>
                    }
                

           </div>

           :

           <div>
            {
                selectedHistoryData && selectedHistoryData.length > 0  && 

                    selectedHistoryData.map((e)=>(
                        <div>
                            {/* <div>{`final result of election: ${e.electionTitle}`}</div> */}

                            
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
                      <TableRow>
                    <TableCell className="font-medium">{ele.name}</TableCell>
                    <TableCell>{ele.partyName}</TableCell>
                    {/* <TableCell>Credit Card</TableCell> */}
                    <TableCell className="text-right">{ele.vote}</TableCell>
                  </TableRow>
                    ))

                  }
                  
                </TableBody>
                <div>
                  <Button className=' hover:cursor-pointer hover:scale-105 active:scale-100' onClick={()=>setIsSelected(false)}>back</Button>
                </div>
              </Table>
                        
                        </div>
                    ))
                

               

            }
           </div>


        }

                


    </div>
  )
}

export default History