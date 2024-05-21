import { Router } from "express";
import RentalsController from "../controllers/rentals.controller.js";

// Ignored for now till token isssue is solved
// import { authenticateToken } from "../config/jwt.config.js";

const rentalRouter = Router()


// API routes for rental

rentalRouter.route("/rental/:gameId")
    .post(RentalsController.rentGame)


rentalRouter.route("/return/:gameId")
    .post(RentalsController.returnGame)


export default rentalRouter;