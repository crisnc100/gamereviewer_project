import Favorites from '../models/favorites.model.js';

const FavoritesController = {
    getFavoriteById: async (req, res) => {
        try {
            const favorite = await Favorites.findByPk(req.params.id);
            if (!favorite) {
                return res.status(404).json({ message: 'Favorite game not found' });
            }
            res.json(favorite);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteFavorite: async (req, res) => {
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