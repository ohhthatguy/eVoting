
const electionModel = require("../models/election.model")
const electionHistoryModel = require("../models/electionHistory.model")

const createNewElection = async(req, res)=>{
    // console.log(req.body)
    const {electionTitle, adminCitizenshipNum} = req.body

    try{

        const electionInDB = await electionModel.findOne({electionTitle, adminCitizenshipNum})
        
        if(electionInDB){
            return res.status(400).json({message: "Same admin has already created election with same name"})
        }

        const electionToCreate = new electionModel(req.body)
        if(!electionToCreate){
            return res.status(400).json({message: "the data is not fitting in model at createNewElection in adminElection.control.js"})
        }

        await electionToCreate.save() 
        return res.status(200).json({message: " election saved succesfully "});


    }catch(err){
        return res.status(500).json({message: "something happened at createNewElection in adminElection.control.js"})
    }


}

const getElectionData = async(req,res)=>{
    // console.log(req.body)
    try{
        const {citizenshipNum} = req.body
        const electionInDB = await electionModel.find({adminCitizenshipNum: citizenshipNum})
        
        if(!electionInDB){
            return res.status(404).json({message: "there is no such election"})
        }

        return res.status(200).json({message: " election saved succesfully ", data: electionInDB});
        


    }catch(err){
        return res.status(500).json({message: "something happened at getElectionData in adminElection.control.js"})

    }
}

const moveElectionDataToHistory = async(req,res)=>{
   

    try {
     

      //this is taken from db and has _id property which should be removed as we are placing it to other collection
      const cleanedElection = {
        ...req.body,
        candidate: req.body.candidate.map(({ _id, ...rest }) => rest) // Exclude `_id` from candidates
      };
      
      delete cleanedElection._id; // Remove `_id` from root
      delete cleanedElection.__v; // Remove `__v` from root
    //   console.log("here2")
      
    //   console.log(cleanedElection);
  
  

      //add in history
      const saveInhisotry = new electionHistoryModel(cleanedElection)
      await saveInhisotry.save()

  
      // Delete the document from the 'election' collection
      await electionModel.deleteOne({ _id: req.body._id });

      
  
      // Commit the transaction
    //   await session.commitTransaction();
      console.log("Election moved to history successfully");

    //   session.endSession();
      return res.status(200).json({message: "moving done succesfully"})


  
    } catch (err) {
      // Roll back the transaction on error
    //   await session.abortTransaction();
    

      console.error("Error moving election to history:", err);
      return res.status(500).json({message: "error occured"})

    } 
  


}

const getElectionHistoryData = async(req,res)=>{
    try{
        const electionInDB = await electionHistoryModel.find({})
        if(!electionInDB){
            return res.status(404).json({message: "No History of elelction"})
        }
        return res.status(200).json({message: " election histry gotten succesfully ", data: electionInDB});


    }catch(err){
        return res.status(500).json({message: "something happened at getElectionHistoryData in adminElection.control.js"})

    }
}

module.exports = { createNewElection, getElectionData, moveElectionDataToHistory, getElectionHistoryData }