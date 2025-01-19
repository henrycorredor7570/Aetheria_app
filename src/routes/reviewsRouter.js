import { Router } from "express";
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from "../controllers/reviewsController.js";

const reviewsRouter = Router();

reviewsRouter.get("", getAllReviews);
reviewsRouter.get("/:id", getReviewById);
reviewsRouter.post("", createReview);
reviewsRouter.put("/:id", updateReview);
reviewsRouter.delete("/:id", deleteReview);

export default reviewsRouter;
