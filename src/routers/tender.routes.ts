import express from "express";
import Middlewares from "../middlewares";
import Tender from "../controllers/tender";
const router = express.Router();

router.post(
  "/post",
  [
    Middlewares.tokenAuth,
    Middlewares.uploadFile("files/tender_files").array("files"),
  ],
  Tender.createTender
);

router.get("/:tender_id", Middlewares.tokenAuth, Tender.getTender);

router.get("/all/tenders", Middlewares.tokenAuth, Tender.getTenders);
router.put("/update", [Middlewares.tokenAuth], Tender.updateTender);

router.delete("/delete", [Middlewares.tokenAuth], Tender.deleteTender);

router.post(
  "/category/create",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  Tender.createTenderCategory
);

router.put(
  "/category/update",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  Tender.updateTenderCategory
);

router.delete(
  "/category/delete",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  Tender.deleteTenderCategory
);

router.get(
  "/category/get-category-by-id",
  [Middlewares.tokenAuth, Middlewares.adminAuth],
  Tender.getTenderCategory
);

router.get("/category/get-all-categories", Tender.getAllTenderCategories);
export default router;
