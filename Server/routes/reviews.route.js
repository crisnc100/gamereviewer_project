import { Router } from "express";
import ReviewsController from "../controllers/reviews.controller.js";

const reviewRouter = Router();

reviewRouter.route("/allReviews").get(ReviewsController.getAllReviews);

reviewRouter.route('/review/:gameId')
    .post(ReviewsController.writeReview)

export default reviewRouter;
