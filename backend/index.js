const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv").config();

const databaseConnection = require('./database/database');
const authRouter = require("./routes/auth.route")

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


app.listen(port, () => {
    console.log(`Connected to backend at port ${port}`);
});

databaseConnection();