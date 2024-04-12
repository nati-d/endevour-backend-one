import express from "express";
import Middlewares from "../middlewares";
import Tag from "../controllers/tags";

const router = express.Router();

router.post(
  "/create",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  Tag.createTag
);

router.put(
  "/update",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  Tag.updateTag
);

router.delete(
  "/delete",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  Tag.deleteTag
);

router.get("/get", [Middlewares.tokenAuth, Middlewares.adminAuth], Tag.getTags);
export default router;
