import {Hono} from "hono";
import { Track } from "../models/tracking";


const app = new Hono();

app.get("/track-details/:id",async(c)=>{

    try {
        
    const id= c.req.param("id")    
    const track= await Track.findOne({trackingId:id});

    if(!track) return c.json({error:"track not found"});


    return c.json(track,200)

    } catch (error) {
        console.log(error)        
    }

})

export default app