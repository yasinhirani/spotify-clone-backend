import nodemailer from "nodemailer";

const sendMail = async (recipient: string, link: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "noreply.tunetide@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mail = {
    to: recipient,
    from: "noreply.tunetide@gmail.com",
    subject: "verify your email",
    html: `<div><p>please click the link below to verify your email address</p><a href=${link}>verify email</a></div>`,
  };

  await transporter.sendMail(mail);
};

export default sendMail;
