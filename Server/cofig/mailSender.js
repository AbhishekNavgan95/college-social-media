const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host:  "smtp.gmail.com",
            auth: {
                user: "abhishekn8899@gmail.com",
                pass : "dkjneqvhyprdshjs",
            } 
        })

        let info = transporter.sendMail({
            from : "Totorial Heaven", 
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`
        })
        return info;
    }
    catch(e) {
        console.log(e?.message)
    }
}

module.exports = mailSender;