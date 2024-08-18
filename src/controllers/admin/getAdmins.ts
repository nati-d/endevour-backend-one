import { Request, Response } from "express";
import prisma from "../../prisma/client/prismaClient";
import _ from "lodash";
import ApiResponse from "../../types/response";
import { Admin_role } from "../../types/types";
import admin, { adminRole } from "../../validation/admin";
const getAdmins = async (req: Request, res: Response) => {
  const { error } = adminRole.validate(req.query);
  const { page } = req.query;
  if (error)
    return res.status(400).json(new ApiResponse(false, "Invalide role query"));

  const role = req.query.role as Admin_role;
  const adminsPerPage = 10;
  try {
    const totalAdmins = await prisma.admin.count();

    const getAdmins = await prisma.admin.findMany({
      skip: page ? (parseInt(page.toString()) - 1) * adminsPerPage : undefined,
      take: adminsPerPage,
      where: {
        role,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    const numberOfPages = Math.ceil(totalAdmins / adminsPerPage);

    const passwordRemoved = getAdmins.map((element) =>
      _.pickBy(element, (value, key) => key !== "password")
    );
    return res.status(200).json(
      new ApiResponse(true, "Admins retrieved successfully.", {
        admins: passwordRemoved,
        totalPages: numberOfPages,
        currentPage: Number(page),
        nextPage:
          page && parseInt(page?.toString()) < numberOfPages
            ? parseInt(page.toString()) + 1
            : null,
      })
    );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiResponse(
          false,
          "Error while retrieving admins. please try again!"
        )
      );
  }
};
export default getAdmins;
