import { Request, Response } from "express";
import ApiResponse from "../../types/response";

const getPostUrl = async (req: Request, res: Response) => {
  if (!req.file)
    return res
      .status(400)
      .json(new ApiResponse(false, "Invalide content provided"));

  const file = req.file.filename;
  return res
    .status(200)
    .json(
      new ApiResponse(true, `https://api.endevour.org/public/posts/${file}`)
    );
};

export default getPostUrl;
