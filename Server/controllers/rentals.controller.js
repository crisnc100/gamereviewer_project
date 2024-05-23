import Rentals from '../models/rentals.model.js';
import Games from '../models/games.model.js';

// All CRUD Logic for Renting a game
const RentalsController = {
    rentGame: async (req, res) => {
        // Renting a game
        try {
            const { gameId } = req.params; // Getting the ID from the game
            const { userId } = req.body; // Getting the ID from the user
            const game = await Games.findByPk(gameId);
            if (!game) { // Checking if the game is even there?
                return res.status(404).json({ message: 'Game not found' });
            }
            const activeRental = await Rentals.findOne({ where: { gameId, returnDate: null } });
            // Seeing active rentals by users and returning a message
            if (activeRental) {
                return res.status(400).json({ message: 'Game is already being rented by another user' });
            }
            // Creating new rentals from a user
            const rental = await Rentals.create({ gameId, userId, rentalDate: new Date(), returnDate: null });
            game.isRented = true; // Mark the game as rented
            game.userId = userId; // Set the renting user ID
            await game.save();
            res.status(200).json(rental);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    returnGame: async (req, res) => {
        // Returning rental game:
        try {
            const { rentalId } = req.params; // Getting the rental id table

            const rental = await Rentals.findByPk(rentalId);
            if (!rental) {
                return res.status(404).json({ message: 'Rental not found from user' });
            }
            rental.returnDate = new Date(); // Setting the date of return
            await rental.save();
            const game = await Games.findByPk(rental.gameId);
            game.isRented = false; // Marking the game as available
            game.userId = null; // This will clear the renting user ID
            await game.save();
            res.status(200).json(rental);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    grabRentalsByUserId : async (req,res) => {
        try {
            const {userId} = req.params
            const allRentalsByUser = await Rentals.findAll({where : {userId, returnDate: null} })
            if(!allRentalsByUser) {
                return res.status(404).json();
            }
            else {
                res.status(200).json(allRentalsByUser)
            }
        }
        catch(error) {
            res.status(500).json(error)
        }
    },
    grabOneRental : async (req, res) => {
        try {
            const {userId} = req.params
            const {gameId} = req.body
            const rental = await Rentals.findOne({where: {userId, returnDate: null }})
            if(!rental) {
                return res.status(404).json({message: "User is not renting this game"});
            }
            else {
                res.status(200).json(rental)
            }
        }
        catch(error) {
            res.status(500).json(error)
        }
    }
};

export default RentalsController;
