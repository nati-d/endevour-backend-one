import express from "express";
import Controller from "../controllers";
import Middlewares from "../middlewares";
const router = express.Router();

router.post(
  "/post",
  [
    Middlewares.tokenAuth,
    Middlewares.uploadFile("files/tender_files").array("files"),
  ],
  Controller.createTender
);

router.delete("/delete", [Middlewares.tokenAuth], Controller.deleteTender);

router.post(
  "/category/create",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  Controller.createTenderCategory
);

router.put(
  "/category/update",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  Controller.updateTenderCategory
);

router.delete(
  "/category/delete",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  Controller.deleteTenderCategory
);

router.get(
  "/category/get-category-by-id",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  Controller.getTenderCategory
);

router.get("/category/get-all-categories", Controller.getAllTenderCategories);
export default router;
