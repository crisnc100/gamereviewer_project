import { Router } from 'express';
import GamesController from '../controllers/games.controller.js';


const gamesRouter = Router();
//All get methods for games
gamesRouter.get('/allGames', GamesController.getAllGames)
gamesRouter.get('/:gameId/allReviews', GamesController.getGameReviews)
gamesRouter.get('/:gameId/allFavorites', GamesController.getGameFavorites)

//All post methods for games
gamesRouter.post('/:gameId/rent', GamesController.rentGame)
gamesRouter.post('/:rentalId/return', GamesController.returnGame)
gamesRouter.post('/:gameId/review', GamesController.writeReview)
gamesRouter.post('/:gameId/favorite', GamesController.favoriteGame)











export default gamesRouter;