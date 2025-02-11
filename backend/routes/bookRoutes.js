import express from "express";
import {
  getBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";

const router = express.Router();

// CRUD routes
router.get("/", getBooks); // Get all books
router.post("/addBook", addBook); // Create a new book
router.get("/:id", getBookById); // Get a book by ID
router.put("/:id", updateBook); // Update a book by ID
router.delete("/:id", deleteBook); // Delete a book by ID

export default router;
