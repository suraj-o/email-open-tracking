import mongoose from "mongoose";

export const dbConnect=async()=>{
    try {
        const host=(await mongoose.connect(process.env.DB_URL!)).connection.host;
        console.log(host)
    } catch (error) {
        console.log("failed while connecting database")
        process.exit(1)
    }
}