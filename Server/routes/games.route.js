import { Router } from 'express';
import GamesController from '../controllers/games.controller.js';
import ReviewsController from '../controllers/reviews.controller.js';
import FavoritesController from '../controllers/favorites.controller.js';
import RentalsController from '../controllers/rentals.controller.js';
import { authenticateToken } from "../config/jwt.config.js";


const gamesRouter = Router();

//Methods for games/getting all reviews and favorites from a game
gamesRouter.get("/allGames", GamesController.getAllGames)
gamesRouter.get("/allReviews/:gameId", GamesController.getGameReviewsByGame)
gamesRouter.get("/allFavorites/:gameId", GamesController.getGameFavoritesByGame)

//Rental Routes
gamesRouter.post("/rent/:gameId", RentalsController.rentGame)
gamesRouter.post('/return/:rentalId', RentalsController.returnGame)

//Reviews Routes: 
gamesRouter.post("/new-review/:gameId", ReviewsController.writeReview)
gamesRouter.get("/reviews/:userId", ReviewsController.getReviewsByUserId)
gamesRouter.route("/reviews/:id")
    .get(ReviewsController.getReviewById)
    .put(ReviewsController.updateReview)
    .delete(ReviewsController.deleteReview)

//Favorites Routes:
gamesRouter.post("/new-favorite/:gameId", FavoritesController.favoriteGame)
gamesRouter.get("/favorites/:userId", FavoritesController.getFavoriteByUserId)
gamesRouter.delete("/favorites/:id", FavoritesController.removeFavorite)


export default gamesRouter;