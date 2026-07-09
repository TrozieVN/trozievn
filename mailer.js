const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ntnh8686@gmail.com",
pass: "rpon oipf irlt lrcw"
    }
});


function sendMail(subject, text){

    transporter.sendMail({
        from: "ntnh8686@gmail.com",
        to: "hai682007@gmail.com",
        subject: subject,
        text: text
    }, (err, info)=>{

        if(err){
            console.log("Lỗi gửi mail:", err);
        } else {
            console.log("Đã gửi mail:", info.response);
        }

    });

}


module.exports = sendMail;