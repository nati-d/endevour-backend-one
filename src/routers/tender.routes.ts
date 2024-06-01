import express from "express";
import Middlewares from "../middlewares";
import Tender from "../controllers/tender";
const router = express.Router();

// Accessed by all user.
router.get("/all/tenders", Middlewares.tokenForAdmin, Tender.getTenders);

router.get("/get/:tender_id", Tender.getTender);

router.get("/category/get-all-categories", Tender.getAllTenderCategories);

router.get("/search-by-keyword", Tender.searchTenderByKeyWord);

// Accessed by all authenticated user
router.use(Middlewares.tokenAuth);

router.post(
  "/post",
  Middlewares.uploadFile("files/tender").array("files"),
  Tender.createTender
);

router.put("/update/:tender_id", Tender.updateTender);

router.delete("/delete/:tender_id", Tender.deleteTender);

router.post("/save-tender", Tender.saveTender);

router.get("/get-saved-tenders", Tender.getSavedTenders);

// Accessed by only admins(authorized)
router.use(Middlewares.adminAuth);

router.post("/category/create", Tender.createTenderCategory);

router.put("/category/update", Tender.updateTenderCategory);

router.delete("/category/delete", Tender.deleteTenderCategory);

router.get("/category/get-category-by-id", Tender.getTenderCategory);

export default router;
