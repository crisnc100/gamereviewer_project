import Rentals from '../models/rentals.model.js';

//All CRUD Logic for Renting a game
const RentalsController = {
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
    }
};

export default RentalsController;