const nodemailer = require("nodemailer");

const sendMail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS,  
    },
  });

  await transporter.sendMail({
    from: `"LearnTube" <${process.env.SMTP_USER}>`, 
    to, 
    subject,
    html, 
  });
};

module.exports = sendMail;
