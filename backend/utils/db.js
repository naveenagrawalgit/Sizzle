import mongoose from "mongoose";

 export const  dbConnect = async ()=>{

    

    try {
        const res = await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected", res.connection.host)
    } catch (error) {
        
        console.log(error)

        
    }
}