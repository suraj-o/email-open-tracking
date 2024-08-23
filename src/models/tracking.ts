import mongoose, { Schema } from "mongoose";

const schema= new Schema({
    trackingId:{
        type:String,
        require:true
    },
    opens:{
        type:Number,
        default:0
    },
    userIps:{
        type:[String],
        default:[]
    }
})

export const Track = mongoose.model("Track",schema)