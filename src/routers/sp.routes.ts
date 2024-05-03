import { Router } from "express";
import Middleware from "../middlewares/index";
import Controller from "../controllers/index";

const router: Router = Router();
const routerPost = Router();

router.post("/signup", Controller.createSp);

router.post("/signin", Controller.signinSp);

router.get("/get-service-provider", Controller.getSp);

router.get("/get-service-provider-by-id", Controller.getSpById);

router.put("/update-service-provider", [Middleware.tokenAuth, Middleware.spAuth], Controller.updateSp)

router.delete("/delete-service-provider",[Middleware.tokenAuth, Middleware.spAuth], Controller.deleteSp);

router.post("/create-service-provider-category",[ Middleware.tokenAuth, Middleware.adminAuth ], Controller.createSpCategory);

router.get("/get-service-provider-category", Controller.getSpCategory);

router.get("/get-service-provider-category-by-name", Controller.getSpCategoryById);

router.put("/update-service-provider-category",[ Middleware.tokenAuth, Middleware.adminAuth ], Controller.updateSpCategory);

router.delete("/delete-service-provider-category",[ Middleware.tokenAuth, Middleware.adminAuth ], Controller.deleteSpCategory);

routerPost.post("/create-post", [Middleware.tokenAuth, Middleware.spAuth], Controller.createSpPost);

routerPost.get("/get-post", Controller.getSpPost);

routerPost.get("/get-post-by-id", Controller.getSpPostById);

routerPost.put("/update-post", [Middleware.tokenAuth, Middleware.spAuth], Controller.updateSpPost);

routerPost.delete("/delete-post", [Middleware.tokenAuth, Middleware.spAuth], Controller.deleteSpPost);

router.use("/post", routerPost);

export default router;
