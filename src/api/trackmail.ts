import {Hono} from "hono";
import { Track } from "../models/tracking";
import {promises as fs } from "fs"
import path from "path";
const app = new Hono();

let imageBuffer:Buffer;

(
    async()=>{
        try {
            imageBuffer=await fs.readFile(path.join(__dirname,"/assets/prof.png"))
        } catch (error) {
            console.log(error)
        }
    }
)();

app.get("/track-mail/:id",async(c)=>{

    try {
        
    const id= c.req.param("id")
    const userIP= c.req.raw.headers.get("true-client-ip") || c.req.raw.headers.get("CF-Connecting-IP") || "0.0.0.0"
    
    const track= await Track.findOne({trackingId:id});

    if(!track) return c.json({error:"track not found"});

    if(!track.userIps.includes(userIP)){
        track.userIps.push(userIP);
        track.opens++;
        await track.save()
    }

    return new Response(imageBuffer,{
        headers:{
            "Content-Type":"image/png",
            "content-length":imageBuffer.length.toString()
        }
    })

    } catch (error) {
        console.log(error)        
    }

})

export default app