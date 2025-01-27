const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv").config();

const databaseConnection = require('./database/database');
const authRouter = require("./routes/auth.route")
const adminElectionRoute = require("./routes/adminElection.route")
const citizenElectionRoute = require("./routes/citizenElection.route")

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true
    })
);

app.use(cookieParser());  //for jwt token insisde cookie

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

//auth routes
app.use("/api/auth", authRouter)
//election route for admin
app.use("/admin/election", adminElectionRoute)

//election route for citizen
app.use("/election", citizenElectionRoute)


app.listen(port, () => {
    console.log(`Connected to backend at port ${port}`);
   
});

databaseConnection();