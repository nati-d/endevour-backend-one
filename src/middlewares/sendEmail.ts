import { Request, Response } from "express";
import sendEmailConfig, { Attachment } from "../configs/sendEmailConfig";
import ApiResponse from "../types/response";

declare global {
  namespace Express {
    interface Request {
      emailData: {
        sendTo: string | string[];
        subject: string;
        html: string;
        file?: Attachment[];
        otherData?: any;
        queryOnFail?: () => void;
        resMessage?: string;
        statusCode?: number;
      };
    }
  }
}

const sendEmail = async (req: Request, res: Response) => {
  const {
    sendTo,
    subject,
    html,
    file,
    otherData,
    queryOnFail,
    resMessage,
    statusCode,
  } = req.emailData;
  try {
    if (file) await sendEmailConfig(sendTo, subject, html, file);
    else await sendEmailConfig(sendTo, subject, html);

    return res
      .status(statusCode || 201)
      .json(
        new ApiResponse(
          true,
          resMessage || "Email send successfully.",
          otherData
        )
      );
  } catch (error) {
    console.log("Error while sending email", error);
    if (queryOnFail) queryOnFail();

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Failed to send email. please try again!",
          null,
          error
        )
      );
  }
};

export default sendEmail;
