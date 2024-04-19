import express, { Router } from "express";
import Controller from "../controllers/index";
import Middleware from "../middlewares/index";

const router: Router = express.Router();

router.post("/create-grant", [Middleware.tokenAuth, Middleware.adminAuth], Controller.createGrant);

router.get("/get-grant", [Middleware.tokenAuth], Controller.getGrant);

router.get("/get-grant-by-id", [Middleware.tokenAuth], Controller.getGrantById);

router.put("/update-grant", [Middleware.tokenAuth, Middleware.adminAuth], Controller.updateGrant);

router.delete("/delete-grant", [Middleware.tokenAuth, Middleware.adminAuth], Controller.deleteGrant);

export default router;
