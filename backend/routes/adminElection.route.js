const express = require('express')
const {createNewElection, getElectionData, moveElectionDataToHistory, getElectionHistoryData, uploadProfile} = require("../controllers/adminElection.controller")
const authenticate = require("../middleware/auth.middleware")
const upload = require("../middleware/uploadProfile.middleware")

const router = express.Router();

router.post("/createNew",authenticate, createNewElection) //admin saves new election to db
router.post("/getElectionData", authenticate, getElectionData) //admin gets new election to db
router.post("/moveToHistory", authenticate ,moveElectionDataToHistory)
router.get("/getHistory", authenticate, getElectionHistoryData)

router.post("/uploadProfile",  upload.single('profile'), uploadProfile)
// router.get('/getProfile/:name', getProfile)


module.exports = router
