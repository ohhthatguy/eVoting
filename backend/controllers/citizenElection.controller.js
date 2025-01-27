const electionModel = require("../models/election.model")
const votedModel = require("../models/voted.model")


const getElectionListToVote = async(req,res)=>{
    // console.log(req.body)
    try{
       
        const electionInDB = await electionModel.find({})
        
        if(!electionInDB){
            return res.status(404).json({message: "there is no such election"})
        }

        return res.status(200).json({message: " election saved succesfully ", data: electionInDB});
        


    }catch(err){
        return res.status(500).json({message: "something happened at getElectionListToVote in citizenElection.control.js"})

    }
}

const getAlreadyVotedList = async(req,res)=>{
    console.log(req.body)
    const {citizenshipNum} = req.body
    try{
       
        const votedList = await votedModel.findOne({voter: citizenshipNum})
        
        if(!votedList){
            return res.status(404).json({message: "user has not voted yet!"})
        }
// console.log(votedList)
        return res.status(200).json({message: " voted list got succesfully ", votedList});
        


    }catch(err){
        return res.status(500).json({message: "something happened at getAlreadyVotedList in citizenElection.control.js"})

    }

}

const makeAlreadyVotedList = async(req,res)=>{

    // console.log(req.body)
    const {citizenshipNum, _id} = req.body
    try{
       
        const result = await votedModel.findOneAndUpdate(
            { voter: citizenshipNum }, // Find by voter field
            { $addToSet: { votedElection: _id } }, // if entry is found with voter id, update else create votedElection field and  $addToSet expects a single value to be added to the array

            { new: true, upsert: true } // upsert makes sure to update if found else create, new make sure to return updated version of data as response
          );


          if(!result){
            res.status(404).json({
                success: false,
                message: "voted list  not found",
              });
          }

        //   console.log(result)
        return res.status(200).json({message: " voted list created/updated", data: {result}});
        

    }catch(err){
        return res.status(500).json({message: "something happened at makeAlreadyVotedList in citizenElection.control.js"})

    }



}

const updateVote = async(req,res)=>{
    // console.log(req.body)
    const {_idelectionList, _idcandidate, newVote} = req.body //of eelctionlist

    try{

        const updateTheVote = await electionModel.findOneAndUpdate(
            {
                _id: _idelectionList,
                "candidate._id": _idcandidate
            },

            {
                $set: { "candidate.$.vote": newVote}
            
            },

            { new: true }      
        )

        // console.log(updateTheVote)

        if(!updateTheVote){
            res.status(404).json({
                success: false,
                message: "Election or candidate not found",
              });
        }
        return res.status(200).json({message: " votedupdated"});
        

    }catch(err){
        return res.status(500).json({message: "something happened at updateVote in citizenElection.control.js"})

    }
}

module.exports = {getElectionListToVote, getAlreadyVotedList, makeAlreadyVotedList,updateVote}