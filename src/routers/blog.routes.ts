import express, { Router } from "express";
import Controller from "../controllers/index";
import Middleware from "../middlewares/index";

const router: Router = express.Router();

router.post("/create-blog", [Middleware.tokenAuth, Middleware.adminAuth], Controller.createBlog);

router.get("/get-blog", [Middleware.tokenAuth], Controller.getBlog);

router.put("/update-blog", [Middleware.tokenAuth, Middleware.adminAuth], Controller.updateBlog);

router.delete("/delete-blog", [Middleware.tokenAuth, Middleware.adminAuth], Controller.deleteBlog);

export default router;
