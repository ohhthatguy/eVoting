
const userModel = require("../models/user.model")
const generateJWTToken = require("../utils/jwtTokenGen")
const bcrypt = require("bcrypt")

 const signup = async(req,res)=>{
    
    // console.log(req.body);
    const {fullName, citizenshipNum, phoneNum, password, role } = req.body;
    
    try{

        const userFromDB = await userModel.findOne({citizenshipNum});
       
        if(userFromDB){
            
            return res.status(400).json({message: " This citizenship number is already on use! "});
        }

        const salt = await bcrypt.genSalt(6);
        const hashedPswd = await bcrypt.hash(password, salt);

        // console.log(hashedPswd)

        const userToSave = new userModel({
            fullName: fullName,
            citizenshipNum: citizenshipNum,
            password: hashedPswd,
            phoneNum: phoneNum,
            role: role
        })

        // console.log(userToSave)

        if(userToSave){
            await userToSave.save()
            return res.status(200).json({message: " user saved succesfully "});
        }

    }catch(err){

        return res.status(500).json({message: " something happened at signup at auth.controller "})

    }


}

 const login = async(req,res)=>{
    // console.log(req.body)

    const {fullName, citizenshipNum, password} = req.body;

    try{

        const userFromDB = await userModel.findOne({citizenshipNum})
        // console.log(userFromDB)

        if(!userFromDB){
            return res.status(400).json({message:  " invalid citizenship number "});
        }
       

        const isPaswdCorrect = await bcrypt.compare(password, userFromDB.password)

        if(!isPaswdCorrect) return res.status(401).json({message: " invalid password "})
            // console.log(isPaswdCorrect)

        //password and citizenship is right so user is authenticated, now create jwt token for this for 30min
        generateJWTToken(userFromDB._id, res)

        res.status(200).json({message: " user login successfully ", role:userFromDB.role})

    }catch(err){
        return res.status(500).json({message: " something happened at login at auth.controller "})

    }
    
}

 const logout = async(req,res)=>{

    try{

        res.cookie("jwtToken", "", {maxAge:0})
        return res.status(200).json({message: " logut successful! "})
  
    }catch(err){
        return res.status(500).json({message: " something happened at logout at auth.controller "})

    }
    
}

 const check = (req,res)=>{
    try{
        console.log(req.verifiedUser)
        res.status(200).json(req.verifiedUser)
    }catch(err){
        return res.status(500).json({message: " something happened at check at auth.controller "})
    }
 }

module.exports = { signup, login, logout, check }