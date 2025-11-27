import express from "express";
import protectRoute from "../middleware/auth.middlware";
import {
  deleteBook,
  getbookbyUser,
  getBooks,
  uploadBook,
} from "../controllers/bookController";

const router = express.Router();

router.post("/", protectRoute, uploadBook);
router.get("/", protectRoute, getBooks);
router.delete("/:id", protectRoute, deleteBook);
router.get("/user", protectRoute, getbookbyUser);

export default router;
