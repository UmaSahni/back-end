import User from "../Module/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

  const register=async(req,res)=>{
      try {
           const{name,email,password}=req.body
           const emailvalid=await User.findOne({email})
           if(emailvalid){
            return res.status(400).json({"message":"user already registered"})
           }
           const haspassword= await bcrypt.hash(password,10)
           const newuser=new User({
            name,
            email,
            password:haspassword
           })
           await newuser.save()
           res.status(201).json({"message":"data save succesfully"})

      } catch (error) {
        res.status(400).json({
            "message":"failed to register"
        })
      }
}

const login=async(req,res)=>{
  try {
    const{ email, password}=req.body
    const checkuser=await User.findOne({email})
    if(!checkuser){
      return res.status(400).json({"message":"user not find"})
    }
    const comparepass= await bcrypt.compare(password,checkuser.password)
    if(!comparepass){
       return res.status(408).json({succes:false,messge:"password not matched "})
       

    }
    const token =await jwt.sign({userId:checkuser._id},process.env.SECRETE_KEY,{expiresIn:"30m"})
    const username=checkuser.name
   
    

     return res.status(201).json({success:true,message:"suceefully loged in", username  ,token })
    
  } catch (error) {
    return res.status(400).json({"message":" failed to login"})
  }
}

export default {register,login}