import { Router } from 'express';
import GamesController from '../controllers/games.controller.js';
import ReviewsController from '../controllers/reviews.controller.js';



const gamesRouter = Router();
//All get methods for games
gamesRouter.get('/allGames', GamesController.getAllGames)
gamesRouter.get('/allReviews/:gameId', GamesController.getGameReviews)
gamesRouter.get('/allFavorites/:gameId', GamesController.getGameFavorites)

//All post methods for games
gamesRouter.post('/rent/:gameId', GamesController.rentGame)
gamesRouter.post('/return/:rentalId', GamesController.returnGame)
gamesRouter.post('/review/:gameId', GamesController.writeReview)
gamesRouter.post('/favorite/:gameId', GamesController.favoriteGame)

//Reviews Routes: 

gamesRouter.route('/reviews/:id')
    .get(ReviewsController.getReviewById)
    .put(ReviewsController.updateReview)
    .delete(ReviewsController.deleteReview)










export default gamesRouter;