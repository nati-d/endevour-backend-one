import express, { Router } from "express";
import Controller from "../controllers";
import Middleware from "../middlewares";

const router: Router = express.Router();
const savedRouter = Router();

router.post("/auth/signup", Controller.userSignup);

router.post("/auth/signin", Controller.userSignin);

router.put("/auth/update", [Middleware.tokenAuth], Controller.userUpdate);

router.post("/auth/verify-otp", Controller.verifyOtp);

savedRouter.post("/job", [Middleware.tokenAuth], Controller.saved.saveJob);

savedRouter.delete("/job", [Middleware.tokenAuth], Controller.saved.deleteJob);

savedRouter.get("/job", [Middleware.tokenAuth], Controller.saved.getJob);

savedRouter.post("/news", [Middleware.tokenAuth], Controller.saved.saveNews);

savedRouter.delete(
  "/news",
  [Middleware.tokenAuth],
  Controller.saved.deleteNews
);

savedRouter.get("/news", [Middleware.tokenAuth], Controller.saved.getNews);

savedRouter.post("/blog", [Middleware.tokenAuth], Controller.saved.saveBlog);

savedRouter.delete(
  "/blog",
  [Middleware.tokenAuth],
  Controller.saved.deleteBlog
);

savedRouter.get("/blog", [Middleware.tokenAuth], Controller.saved.getBlog);

savedRouter.post("/grant", [Middleware.tokenAuth], Controller.saved.saveGrant);

savedRouter.delete(
  "/grant",
  [Middleware.tokenAuth],
  Controller.saved.deleteGrant
);

savedRouter.get("/grant", [Middleware.tokenAuth], Controller.saved.getGrant);

savedRouter.post(
  "/tender",
  [Middleware.tokenAuth],
  Controller.saved.saveTender
);

savedRouter.delete(
  "/tender",
  [Middleware.tokenAuth],
  Controller.saved.deleteTender
);

savedRouter.get("/tender", [Middleware.tokenAuth], Controller.saved.getTender);

savedRouter.post(
  "/organization",
  [Middleware.tokenAuth],
  Controller.saved.saveOrganization
);

savedRouter.delete(
  "/organization",
  [Middleware.tokenAuth],
  Controller.saved.deleteOrganization
);

savedRouter.get(
  "/organization",
  [Middleware.tokenAuth],
  Controller.saved.getOrganization
);

savedRouter.post(
  "/service-provider",
  [Middleware.tokenAuth],
  Controller.saved.saveServiceProvider
);

savedRouter.delete(
  "/service-provider",
  [Middleware.tokenAuth],
  Controller.saved.deleteServiceProvider
);

savedRouter.get(
  "/service-provider",
  [Middleware.tokenAuth],
  Controller.saved.getServiceProvider
);

savedRouter.post(
  "/procurement",
  Middleware.tokenAuth,
  Controller.saved.procurement,
  Middleware.sendEmail
);

savedRouter.get(
  "/get-procurement-history",
  [Middleware.tokenAuth, Middleware.adminAuth],
  Controller.saved.getProcurementHistory
);

router.use("/saved", savedRouter);

router.post(
  "/request-for-cv-editing",
  Middleware.tokenAuth,
  Controller.requestForCVEditing
);
router.get(
  "/get-cv-editing-requests",
  [Middleware.tokenAuth, Middleware.adminAuth],
  Controller.getCVEditingRequests
);

export default router;
