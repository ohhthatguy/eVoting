import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../context/auth"
import { axiosInstance } from "@/utils/axios"
import { electionCreationType } from "../admin/zod-schema-admin"
import { Button } from "@/components/ui/button"

const CitizenHomePage = () => {

  type alreadyVotedType = {
    voter: string,
    votedElection: string[]
  }

    const user = useContext(AuthContext)
    const [electionList, setElectionList] = useState<electionCreationType[]>()
    const [electionToVote, setElectionToVote] = useState<electionCreationType>()
    const [alreadyVotedList, setAlreadyVotedList] = useState<alreadyVotedType>()
    const [hasVoted, setHasVoted] = useState<boolean>(false)

    // console.log(user?.user)
    
      //gets all the available election that can be voted by citizen
      useEffect(()=>{
        const getElectionToVoteList = async()=>{
          try{
      
            const res = await axiosInstance.get("/election/electionList")
      
            if(!res){
              console.log("no election found")
              throw new Error("no elction found")
            }
            setElectionList(res.data.data)
            console.log(res)
      
          }catch(err:any){
            console.log(err)
    
            if(err.status == '401' && err.response.data.message == " unauthorized user - no token found "){
              console.log(" unauthorized user - no token found ")
              user?.setUser(undefined)
            }
          }
        }

        getElectionToVoteList()
      },[])

      //gets all the election citizen that user has already given vote
      useEffect(()=>{

        const VotedList = async()=>{
          
          let citizenshipNum;
          if(user?.user && user.user.citizenshipNum){
             citizenshipNum = user?.user?.citizenshipNum
          }else{
            console.log("couldnt get citizenship number while getting already voted list in citizenHomePgae useEffect VotedList")
            return
          }

            try{

              const res = await axiosInstance.post("/election/votedElectionList", {citizenshipNum})
          
                if(!res){
                  console.log("false citizenshipNUm ")
                  throw new Error("false citizenshipNUm ")
                }
                setAlreadyVotedList(res.data.votedList)
                console.log(res.data.votedList)
    
    
            }catch(err:any){
              console.log(err)
        
                if(err.status == '401' && err.response.data.message == " unauthorized user - no token found "){
                  console.log(" unauthorized user - no token found ")
                  user?.setUser(undefined)
                }
            }
        }

        VotedList()
       
      },[])

      console.log(alreadyVotedList)


      const handleVoteUpdate = async(e:any)=>{


        console.log(e)
        // console.log(electionToVote && electionToVote._id as electionCreationType)
        const k = electionToVote && (electionToVote as any)._id 
       
        let voteUpdated = false;
        const wantsToVote =  confirm('You really want to vote ?')

        if(wantsToVote){

          //update vote first
          const argsForUpdatingVote = {

            newVote: e.vote++,
            _idcandidate: e._id,
            _idelectionList: k,
           

          }
          try{

              const res = await axiosInstance.put("/election/updateVote", argsForUpdatingVote)

              if(!res){
                console.log("something worng with args ")
                throw new Error("something worng with args ")
              }
              
              console.log(res)
              voteUpdated = true;

          }catch(err:any){
            console.log(err)
        
            if(err.status == '401' && err.response.data.message == " unauthorized user - no token found "){
              console.log(" unauthorized user - no token found ")
              user?.setUser(undefined)
            }
          }

          //update the voter id in already voted list
          if(voteUpdated){


            const argsForUsertingVotedelectionList = {
              citizenshipNum: user?.user?.citizenshipNum,
               _id: k
            }


            try{

              const res = await axiosInstance.put("/election/upsertVotedElectionList", argsForUsertingVotedelectionList)

              if(!res){
                console.log("something worng with args ")
                throw new Error("something worng with args ")
              }
              
              // console.log("alreaday voted upset list")
              // console.log(res)
              setAlreadyVotedList(res.data.data.result.votedElection)
             

          }catch(err:any){
            console.log(err)
        
            if(err.status == '401' && err.response.data.message == " unauthorized user - no token found "){
              console.log(" unauthorized user - no token found ")
              user?.setUser(undefined)
            }
          }
          }

        }
        
      }

      const handlefirstClick = (e:any)=>{

        const hasBeenVoted = alreadyVotedList &&  (alreadyVotedList as any).votedElection
        .some((ele:any) => ele === e._id )
        console.log(alreadyVotedList)
        if(hasBeenVoted){
          alert("you have already voted this election")
        }else{
          console.log(e)
          setElectionToVote(e)
        }

      }

  return (
    <div className="bg-slate-700 h-screen">
        <div>
        {`Welcome Citizen, mr. ${user?.user?.fullName}`}
      </div>

        
       {
          (electionList && electionList.length > 0) ? 
          
          <div>
            {
              electionList.map((e,index)=>(
              <div>

                  <div key={index} className='bg-red-400 w-44 h-24 hover:cursor-pointer hover:scale-105 active:scale-100' onClick={()=> handlefirstClick(e)}>
                    <div className='text-2xl '>{e.electionTitle}</div>
                    <div>{`createdBy: ${e.createdBy}`}</div>
                  </div>

                  </div>))
            }

            {   
            (electionToVote ) && 
                  
                    <div className="border-2 border-red-700 p-2">
                      {
                        electionToVote.candidate.map((e, index)=>(

                            <div key={index} className="border-2 border-green-300 p-2">

                            <div>
                              {`partylogo: ${e.partyLogo}`}
                              <div>{`profile: ${e.profile} `}</div>

                            </div>
                            
                            <div>
                            {`  candiadteName: ${e.name} \n
                              party: ${e.partyName}`}
                            </div>

                            <div>
                              <Button variant={"outline"} onClick={()=>handleVoteUpdate(e)}>Vote</Button>
                            </div>
                          </div>

                        ))
                        
                      }
                    
                    </div>
            }

            </div>
           : 
          
          <div>
            There are no election currently setUp for you to vote. Please try again later
          </div>


       }

    </div>
  )
}

export default CitizenHomePage