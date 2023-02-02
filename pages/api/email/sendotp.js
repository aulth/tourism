import { createTransport } from "nodemailer";
const key = process.env.key;
const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.email,
        pass: key
    },
});



const sendOtp = async (req, res) => {
    console.log('sendotp api hitted');
    const { otp, to} = JSON.parse(JSON.stringify(req.body));
    console.log(req.body)
    if (!otp || !to) {
        return res.json({ success: false, msg: "All fields required" });
    }
    const mailOption = {
        from: `AlAtwal Registration <${process.env.email}>`,
        to: to,
        subject: "OTP Verification",
        html:`<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"> <div style="margin:50px auto;width:70%;padding:20px 0"> <div style="border-bottom:1px solid #eee"> <a href="" style="font-size:1.4em;color: #fa8006;text-decoration:none;font-weight:600">Al Altwal</a> </div> <p style="font-size:1.1em">Hi,</p> <p>Thank you for choosing Al Atwal. Use the following OTP to complete your Sign Up procedures. </p> <h2 style="background: rgb(47, 172, 240);margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2> <p style="font-size:0.9em;">Regards,<br />Al Altwal</p> <hr style="border:none;border-top:1px solid #eee" /> <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300"> <p>Alatwal Travel & Tourism LLC</p> <p>UAE Dubai</p> <p>UAE</p> </div> </div> </div>`
    };
    transporter.sendMail(mailOption, (err, info) => {
        if (err) console.log(err)
        return res.json({ success:true, info});
    });
}

export default sendOtp;