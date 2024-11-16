import { Router } from "express";
import { createReview, getAllReviews, getReviewById, updateReview } from "../controllers/reviewsController.js";

const reviewsRouter = Router();

reviewsRouter.get("", getAllReviews);
reviewsRouter.get("/:id", getReviewById);
reviewsRouter.post("", createReview);
reviewsRouter.put("/:id", updateReview);


export default reviewsRouter;
