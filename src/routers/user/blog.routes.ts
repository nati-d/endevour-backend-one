import express, { Router } from "express";
import Controller from "../../controllers/index";
import Middleware from "../../middlewares/index";

const router: Router = express.Router();

router.post("/create-blog", [Middleware.userAuth], Controller.createBlog);

router.get("/get-blog", [Middleware.userAuth], Controller.getBlog);

router.get("/get-blog-by-id", [Middleware.userAuth], Controller.getBlogById);

router.put("/update-blog", [Middleware.userAuth], Controller.updateBlog);

router.delete("/delete-blog", [Middleware.userAuth], Controller.deleteBlog);

export default router;
