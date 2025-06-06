import express from "express"
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { protect } from "../middleware/auth.js";


const router = express.Router();


// registering a user
router.post("/register", async (req,res)=>{

    const {userName, email, password}= req.body;

try {
    if(!userName || !email || !password){
         res.status(400).json({message: 'Please fill all fields'})
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400).json({message: "User already exists"})
    }

    const user = await User.create({userName, email, password})

        const token = generateToken(user._id);


    res.status(201).json({
        _id: user._id,
        userName : user.userName,
        email: user.email,
        token,
    })
} catch (error) {
    res.status(500).json({message: " error in back during signup"})
}
})

// login the user
router.post("/login",async (req,res)=>{

    const { email, password}= req.body;


    console.log("inside user")
        const user = await User.findOne({email})
        console.log(user)


try {
    
    console.log((await user.matchPassword(password)))
        if(!user || !(await user.matchPassword(password)))
        {
          return  res.status(401).json({message: "Invalid credentials during login"})
        }

        const token = generateToken(user._id);
    
        res.json({
             _id: user._id,
            userName : user.userName,
            email: user.email,
            token,
        })

} catch (error) {
      res.status(500).json({message: " error in back during login"})
}
})

router.get("/me",protect, (req, res)=>{
    res.status(201).json(req.user)
})

// genersting jwt token
const generateToken = (id) =>{

    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '7d'})
}



export default router




