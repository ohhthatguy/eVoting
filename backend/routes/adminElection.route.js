const express = require('express')
const {createNewElection, getElectionData, moveElectionDataToHistory, getElectionHistoryData} = require("../controllers/adminElection.controller")
const authenticate = require("../middleware/auth.middleware")

const router = express.Router();

router.post("/createNew",authenticate, createNewElection) //admin saves new election to db
router.post("/getElectionData", authenticate, getElectionData) //admin gets new election to db
router.post("/moveToHistory", authenticate ,moveElectionDataToHistory)
router.get("/getHistory", authenticate, getElectionHistoryData)

module.exports = router
