import Games from '../models/games.model.js';
import Reviews from '../models/reviews.model.js';
import Favorites from '../models/favorites.model.js';
import axios from 'axios' //Had to import for games API which is handled in the backend

const RAWG_API_KEY = process.env.RAWG_API_KEY; // Stored my API key in an environment variable

const GamesController = {
    //Getting all games
    getAllGames: async (req, res) => {
        try {
            const response = await axios.get(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}`);
            const games = response.data.results;

            // Save games to the database if they don't exist
            const formattedGames = await Promise.all(games.map(async game => {
                //Storing the API games to the database and setting IDs
                const [existingGame, created] = await Games.findOrCreate({ 
                    where: { title: game.name },
                    defaults: {
                        genre: game.genres.map(genre => genre.name).join(', '),
                        description: game.description || 'No description available',
                        isRented: false,
                        userId: null,
                        releaseDate: game.released,
                        background_image: game.background_image
                    }
                });
                return existingGame; // Returns the game record from the database
            }));

            res.status(200).json(formattedGames);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Get reviews for a specific game
    getGameReviewsByGame: async (req, res) => {
        try {
            const {gameId} = req.params;
            const reviews = await Reviews.findAll({where: {gameId} });
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    // Get users who favorited a specific game
    getGameFavoritesByGame: async (req, res) => {
        try {
            const {gameId} = req.params;
            const favorites = await Favorites.findAll({where: {gameId}, include: Games });
            res.status(200).json(favorites);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

};

export default GamesController;