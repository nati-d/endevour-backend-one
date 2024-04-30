import express from "express";
import Middlewares from "../middlewares";
import Tender from "../controllers/tender";
const router = express.Router();

// Accessed by all user.
router.get("/:tender_id", Tender.getTender);

router.get("/all/tenders", Tender.getTenders);

// Accessed by all authenticated user
router.use(Middlewares.tokenAuth);

router.post(
  "/post",
  Middlewares.uploadFile("files/tender").array("files"),
  Tender.createTender
);

router.put("/update", Tender.updateTender);

router.delete("/delete", Tender.deleteTender);

// Accessed by only admins(authorized)
router.use(Middlewares.adminAuth);

router.post("/category/create", Tender.createTenderCategory);

router.put("/category/update", Tender.updateTenderCategory);

router.delete("/category/delete", Tender.deleteTenderCategory);

router.get("/category/get-category-by-id", Tender.getTenderCategory);

router.get("/category/get-all-categories", Tender.getAllTenderCategories);

export default router;
