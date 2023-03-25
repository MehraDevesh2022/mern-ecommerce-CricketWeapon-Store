const nodeMailer = require("nodemailer");
// options are pass as arg from userController
const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
          //Simple Mail Transfer Protocol (SMTP) (write any thing but that make sense. its env fi)
        host: process.env.SMTP_HOST, // "smtp.gmail.com"
        port: process.env.SMTP_PORT,  // 465,
        service: process.env.SMTP_SERVICE, // gmail
        auth: {
            // this our email and pass wich one we use for sending mail
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });


    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message, 
    };

    await transporter.sendMail(mailOptions);

   
}
module.exports = sendEmail;