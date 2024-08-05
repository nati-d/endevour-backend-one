import prisma from "../../prisma/index";
import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import _ from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Validator from "../../validation";
import ApiResponse from "../../types/response";

export default async (req: Request, res: Response) => {
  const { error } = Validator.sp.createSp.validate(req.body);

  if (error)
    return res
      .status(400)
      .send(
        new ApiResponse(false, "unidentified request content", error.details)
      );

  let password;
  try {
    password = bcrypt.hashSync(req.body.password, 10);
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json(new ApiResponse(false, "internal server error"));
  }

  try {
    let sp: any = await prisma.client.service_provider.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        about: req.body.about,
        service_category: req.body.service_category,
        password,
        company: req.body.company,
        website: req.body.website,
        address: req.body.address,
      },
    });

    delete sp?.password;
    sp.is_service_provider = true;

    let token = jwt.sign(sp, process.env.JWT_KEY as string);

    return res
      .header("authorization", token)
      .status(201)
      .json(
        new ApiResponse(true, "service provider created successfully", token)
      );
  } catch (error: any) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2003")
        return res
          .status(400)
          .json(new ApiResponse(false, "unique key constraint error", error));
    }

    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "unknown error while creating service provider",
          error
        )
      );
  }
};
