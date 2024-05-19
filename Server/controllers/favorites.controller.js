import Favorites from '../models/favorites.model.js';
import User from '../models/users.model.js';

//All CRUD logic for favorites
const FavoritesController = {
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
    getFavoriteByUserId: async (req, res) => {
        try {
            const {userId} = req.params;
            const favorite = await Favorites.findOne({where: {userId} });
            if (!favorite) {
                return res.status(404).json({ message: 'Favorite game not found' });
            }
            res.json(favorite);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    removeFavorite: async (req, res) => {
        try {
            const { id } = req.params;
            const favorite = await Favorites.findByPk(id);
            if (!favorite) {
                return res.status(404).json({ message: 'Favorite game not found' });
            }
            await favorite.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default FavoritesController;