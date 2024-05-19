import { Router } from "express";
import GamesController from "../controllers/games.controller.js";
import ReviewsController from "../controllers/reviews.controller.js";
import FavoritesController from "../controllers/favorites.controller.js";
import { authenticateToken } from "../config/jwt.config.js";

const gamesRouter = Router();
//All get methods for games/getting all reviews and favorites
gamesRouter.get("/allGames", authenticateToken, GamesController.getAllGames);
gamesRouter.get("/allReviews/:gameId", GamesController.getGameReviews);
gamesRouter.get("/allFavorites/:gameId", GamesController.getGameFavorites);

//All post methods for rentals/favorites (creating)
gamesRouter.post("/rent/:gameId", GamesController.rentGame);
gamesRouter.post("/return/:rentalId", GamesController.returnGame);
gamesRouter.post("/review/:gameId", GamesController.writeReview);
gamesRouter.post("/favorite/:gameId", GamesController.favoriteGame);

//Reviews Routes:

gamesRouter
  .route("/reviews/:id")
  .get(ReviewsController.getReviewById)
  .put(ReviewsController.updateReview)
  .delete(ReviewsController.deleteReview);

//Favorites Routes:
gamesRouter
  .route("/favorites/:id")
  .get(FavoritesController.getFavoriteById)
  .delete(FavoritesController.deleteFavorite);

export default gamesRouter;
