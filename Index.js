import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import router from "./routes/User.js"
import cors from "cors"


dotenv.config();
const app=express();
const port=process.env.PORT;
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use("/api",router)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("database connected succesfully");
})
.catch((err)=>{
    console.log(error);
})


app.get("/",(req,res)=>{
    res.send("hello world ")
})


app.listen(port,()=>{
    console.log(`server started on ${port}`);
    
})
