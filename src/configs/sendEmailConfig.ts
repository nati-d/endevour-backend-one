import nodemailer from "nodemailer";
export interface Attachment {
  filename: string;
  path: string;
}

const sendEmailConfig = (
  sendTo: string,
  subject: string,
  html: string,
  file?: Attachment[]
) => {
  const transporter = nodemailer.createTransport({
    host: "endevour.org",
    port: 465,
    secure: true,
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
    attachments: file,
  });
};

export default sendEmailConfig;
