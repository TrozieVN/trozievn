const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "ntnh8686@gmail.com",
        pass: "limo buan agjv nqvp"
    }
});


async function sendMail(subject, text){

    try {

        const info = await transporter.sendMail({

            from: "ntnh8686@gmail.com",
            to: "hai682007@gmail.com",
            subject: subject,
            text: text

        });


        console.log("Đã gửi mail:", info.response);


    } catch(err){

        console.log("Lỗi gửi mail:", err.message);

    }

}


module.exports = sendMail;