import Games from "../models/games.model";

const gamesController = {
    getAllGames: async (req, res) => {
        try {
            const games = await Games.findAll();
            res.json(games);
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}