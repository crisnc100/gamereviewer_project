import Games from '../models/games.model.js';
import Reviews from '../models/reviews.model.js';
import Favorites from '../models/favorites.model.js';
import Rentals from '../models/rentals.model.js';


const GamesController = {
    //Getting all games from the games
    getAllGames: async (req, res) => {
        try {
            const games = await Games.findAll({order: [['genre', 'ASC']]});
            res.status(200).json(games);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    rentGame: async (req, res) => {
        //Renting a game
        try {
            const {gameId} = req.params; //Getting the ID from the game
            const {userId} = req.body; //Getting the ID from the user
            const game = await Games.findByPk(gameId);
            if (!game) { //Checking if the game is even there?
                return res.status(404).json({message: 'Game not found'})
            }
            const activeRental = await Rentals.findOne({where: {gameId, returnDate: null} }); 
            //Seeing active rentals by users and returning a message
            if (activeRental) {
                return res.status(400).json({message: 'Game is already being rented by another user'});
            }
            //Creating new rentals from a user
            const rental = await Rentals.create({gameId, userId, rentalDate: new Date ()});
            res.status(200).json(rental);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    returnGame: async (req, res) => {
        //Returning rental game:
        try {
            const {rentalId} = req.params; //Getting the rental id table

            const rental = await Rentals.findByPk(rentalId); 
            if (!rental) {
                return res.status(404).json({message: 'Rental not found from user'});
            }
            rental.returnDate = new Date(); //Setting the date of return
            await rental.save();
            res.status(200).json(rental);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    //Leaving a review:
    writeReview: async (req, res) => {
        try {
            //Getting the ids / columns from the review tables: 
            const {gameId} = req.params;
            const {userId, reviewText, rating} = req.body;

            //Creating a new review:
            const review = await Reviews.create ({gameId, userId, reviewText, rating});
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    },
    //User favorites a game:
    favoriteGame: async (req, res) => {
        try {
            const {gameId} = req.params;
            const {userId} = req.body;

            const favorite = await Favorites.create({gameId, userId}); //Creating new favorite from the IDs
            res.status(200).json({favorite}) 
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    // Get reviews for a specific game
    getGameReviews: async (req, res) => {
        try {
            const {gameId} = req.params;
            const reviews = await Reviews.findAll({where: {gameId} });
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    // Get users who favorited a specific game
    getGameFavorites: async (req, res) => {
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