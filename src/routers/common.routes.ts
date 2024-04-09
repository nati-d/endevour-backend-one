import express from "express";
const router = express.Router();
import Common from "../controllers/common";
import Middleware from "../middlewares/index";

router.post("/forgot-password", Common.forgotPassword);

router.post(
  "/verify-forgot-password-confirmation-code",
  Common.verifyConfirmationCode
);

router.post(
  "/get-post-url",
  [
    Middleware.tokenAuth,
    Middleware.adminAuth,
    Middleware.uploadFile("posts").single("post"),
  ],
  Common.getPostUrl
);
export default router;
