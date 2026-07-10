const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: ntnh8686@gmail.com,
        pass: cksw lytm qosj fepz
    }
});


async function sendMail(subject, text){

    try {

        const info = await transporter.sendMail({
            from: ntnh8686@gmail.com,
            to: "hai682007@gmail.com",
            subject,
            text
        });

        console.log("Đã gửi mail:", info.response);

    } catch(err){

        console.log("Lỗi gửi mail:", err.message);

    }

}


module.exports = sendMail;