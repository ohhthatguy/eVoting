const express = require("express")

const { getElectionListToVote, getAlreadyVotedList, makeAlreadyVotedList, updateVote} = require("../controllers/citizenElection.controller")
const authenticate = require("../middleware/auth.middleware")


const router = express.Router()

router.get("/electionList", authenticate, getElectionListToVote)
router.post("/votedElectionList", authenticate, getAlreadyVotedList)
router.put("/upsertVotedElectionList", authenticate, makeAlreadyVotedList)
router.put("/updateVote", authenticate, updateVote)

module.exports = router
