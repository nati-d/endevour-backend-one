import express, { Router } from "express";
import Controller from "../controllers/index";
import Middleware from "../middlewares/index";

const router: Router = express.Router();

router.post("/create-blog", [ Middleware.tokenAuth ], Controller.createBlog);

router.get("/get-blog", Middleware.tokenForAdmin, Controller.getBlog);

router.get("/get-blog-by-id", Controller.getBlogById);

router.put("/update-blog", [ Middleware.tokenAuth ], Controller.updateBlog);

router.delete("/delete-blog", [ Middleware.tokenAuth ], Controller.deleteBlog);

export default router;
