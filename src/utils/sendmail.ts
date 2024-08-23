import {createTransport} from "nodemailer"

const transpost = createTransport({
    host:process.env.SMTP_HOST,
    auth:{
        user:process.env.USER_NAME,
        pass:process.env.USER_PASS
    }
})


export const sendMail=async(emails:string[],trackingId:string)=>{
try {
    const baseUrl=`${process.env.BASE_URL}/track/track-mail/${trackingId}`
    const mailOptions={
        from:process.env.USER_NAME,
        to:emails,
        subject:"tracking pixel id",
        html:`
            <h1>your ID:${trackingId}</h1>
            <img src=${baseUrl} alt={"baseImage"} style={{display:"none"}}/>
        `
    }
    await transpost.sendMail(mailOptions)

    return true
} catch (error) {
    console.log(error)
}
}