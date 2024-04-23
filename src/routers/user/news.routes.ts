import express, { Router } from "express";
import Controller from "../../controllers/index";
import Middleware from "../../middlewares/index";

const router: Router = express.Router();

router.post("/create-news", [Middleware.tokenAuth, Middleware.adminAuth], Controller.createNews);

router.get("/get-news", [Middleware.tokenAuth], Controller.getNews);

router.get("/get-news-by-id", [Middleware.tokenAuth], Controller.getNewsById);

router.put("/update-news", [Middleware.tokenAuth, Middleware.adminAuth], Controller.updateNews);

router.delete("/delete-news", [Middleware.tokenAuth, Middleware.adminAuth], Controller.deleteNews);

export default router;
