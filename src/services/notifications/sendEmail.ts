import nodemailer from "nodemailer";
const sendEmail = async (sendTo: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "endevour.org",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "info@endevour.org",
      pass: "Bwn#+AUS853W",
    },
  });

  return transporter.sendMail({
    from: "info@endevour.org",
    to: sendTo,
    subject: subject,
    html: html,
  });
};

export default sendEmail;
