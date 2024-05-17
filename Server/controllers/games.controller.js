import Games from '../models/games.model.js';
import User from '../models/users.model.js';
import Reviews from '../models/reviews.model.js';
import Favorites from '../models/favorites.model.js';
import Rentals from '../models/rentals.model.js';


const GamesController = {
    getAllGames: async (req, res) => {
        try {
            const games = await Games.findAll({order: [['genre', 'ASC']]});
            res.status(200).json(games);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}








export default GamesController;