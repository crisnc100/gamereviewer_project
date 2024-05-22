import { Router } from "express";
import ReviewsController from "../controllers/reviews.controller.js";

const reviewRouter = Router();

reviewRouter.route("/allReviews").get(ReviewsController.getAllReviews);

export default reviewRouter;
