import nodemailer from "nodemailer";
const sendEmail = async (
  sendTo: string,
  subject: string,
  text: string,
  html: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amanuelwt@gmail.com",
      pass: "aodf jxcc tack fahc",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: "amanuelwt@gmail.com",
      to: sendTo, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
    });

    console.log(info);
    return info;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default sendEmail;
