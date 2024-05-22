import { Router } from "express";
import RentalsController from "../controllers/rentals.controller.js";

// Ignored for now till token isssue is solved
// import { authenticateToken } from "../config/jwt.config.js";

const rentalRouter = Router()


// API routes for rental

rentalRouter.route("/rental/:gameId")
    .post(RentalsController.rentGame)

//Had to change to put since where updating the condition its in (available or not)
rentalRouter.route("/return/:rentalId")
    .put(RentalsController.returnGame)


export default rentalRouter;