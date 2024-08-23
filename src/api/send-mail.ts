import {Hono} from "hono";
import {v4 as uuid} from "uuid";
import { Track } from "../models/tracking";
import { sendMail } from "../utils/sendmail";
const app = new Hono();

app.post("/send-mail",async(c)=>{
  try {
    const {email,password}=await c.req.json();

    if(!email || !password) return c.json({error:"fill all require perametere"});
    // if(password===process.env.EMAIL_PASSWORD) return c.json({error:"password did'nt match"})

    const trackingId=uuid();
    const response=await Track.create({trackingId});

    if(!response) throw new Error("Failed to store tracking id in database");

    const mailResponse= await sendMail(email,trackingId)

    if(mailResponse){
      return c.json({
        success:true,
        message:"mail sent successfully",
        trackingId,
    })
    }

  } catch (error) {
    console.log(error)
  }

    
})

export default app