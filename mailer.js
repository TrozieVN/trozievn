const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ntnh8686@gmail.com",
        pass: "cksw lytm qosj fepz"
    }
});

async function sendMail(subject, text) {

    const info = await transporter.sendMail({
        from: "ntnh8686@gmail.com",
        to: "hai682007@gmail.com",
        subject,
        text
    });

    console.log("Đã gửi mail:", info.response);

    return info;
}

module.exports = sendMail;