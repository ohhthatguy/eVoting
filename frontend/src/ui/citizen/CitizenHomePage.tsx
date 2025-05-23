import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../context/auth"
import { axiosInstance } from "@/utils/axios"
import { electionCreationType } from "../admin/zod-schema-admin"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const CitizenHomePage = () => {

  const naviagte = useNavigate()

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

   
    


      const handleVoteUpdate = async(e:any)=>{


        console.log(e)
        // console.log(electionToVote && electionToVote._id as electionCreationType)
        const k = electionToVote && (electionToVote as any)._id 
       
        let voteUpdated = false;
        const wantsToVote =  confirm('You really want to vote ?')

        if(wantsToVote){

          //update vote first
          const argsForUpdatingVote = {

            newVote: e.vote,
            _idcandidate: e._id,
            _idelectionList: k,
           

          }

          console.log(argsForUpdatingVote)
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

          // update the voter id in already voted list
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


          //return to top
          window.location.reload();

        }
        
      }

      const handlefirstClick = (e:any)=>{

        const hasBeenVoted = alreadyVotedList &&  (alreadyVotedList as any).votedElection
        .some((ele:any) => ele === e._id )
        console.log(alreadyVotedList)


        // open this wehn using
        if(hasBeenVoted){
          alert("you have already voted this election")
        }else{
          console.log(e)
          setElectionToVote(e)
        }



      }

      const handleClosing = ()=>{
        setElectionToVote(undefined)

      }

  return (
    <div className="bg-slate-700 h-screen">

        <div className="text-white font-bold text-2xl   p-3">
       well aren't a good citizen,<br/>  <span className="text-3xl"> {` Mr. ${user?.user?.fullName}`} </span>
      </div>


<div className="mt-4 bg-red-950  p-3">

      <div>
        <h2 className="text-white font-extralight text-3xl "> Available Election: </h2>

      </div>
        
       {
          (electionList && electionList.length > 0) ? 
          
          <div>

            <div className="grid mt-8 place-content-center place-items-center grid-cols-3">
            {
              electionList.map((e,index)=>(
              <div>

                  <div key={index} className='bg-red-400 w-56 min-w-fit rounded-xl h-52 hover:cursor-pointer hover:scale-105 active:scale-100 grid place-content-center ' onClick={()=> handlefirstClick(e)}>

                    
                  

                    <div className='text-2xl font-bold text-white'>{e.electionTitle}</div>

                    <div>{`createdBy: ${e.createdBy}`}</div>

                  </div>

                  </div>))
            }
            </div>


            {   
            (electionToVote ) && 
                  
                    <div className="border-2 border-yellow-700 p-2 bg-slate-700 mt-10">

                      <div className="mb-4 flex justify-between">
                        <div className="font-bold text-white text-3xl">{electionToVote.electionTitle}</div>
                        <Button onClick={handleClosing}>X</Button>
                      </div>
                      
                      <div className="grid place-content-center grid-cols-2 gap-6">
                      {
                        electionToVote.candidate.map((e, index)=>(

                            <div key={index} className="border-2 border-green-300 p-4 bg-gradient-to-r from-black to-gray-600 h-80 rounded-md">

                            <div className= 'h-[60%] bg-cover bg-center'  style={{backgroundImage: `url("${e.profile}")`}} >
                              {/* background is party logo */}
                             
                              <div> 
                                <img src={e.partyLogo} alt="profile here" height={100} width={150} />
                               

                              </div>
                             

                            </div>
                            
                            <div className="h-[30%] text-white text-xl p-2">

                              <div>
                                <span className="text-2xl font-bold">Name:</span> 
                                {` ${e.name} `}
                              </div>

                              <div>
                                <span className="text-2xl font-bold">party:</span>
                                {` ${e.partyName}`}
                                </div>
                            </div>

                            
                              <Button variant={"outline"} className="w-full hover:bg-black hover:text-white" onClick={()=>handleVoteUpdate(e)}>Vote</Button>
                            

                          

                          </div>

                        ))
                        
                      }
                      </div>
                    
                    </div>
            }

            </div>
           : 
          
          <div>
            There are no election currently setUp for you to vote. Please try again later
          </div>


       }
</div>

    </div>
  )
}

export default CitizenHomePage