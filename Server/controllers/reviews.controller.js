import Reviews from '../models/reviews.model.js'; 


//All CRUD logic for reviews:
const ReviewsController = {
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
    getReviewsByUserId: async (req, res) => {
        try {
            const {userId} = req.params;
            const review = await Reviews.findAll({where: {userId} });
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            res.json(review);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getReviewById: async (req, res) => {
        try {
            const { id } = req.params;
            const review = await Reviews.findByPk(id);
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            res.json(review);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateReview: async (req, res) => {
        try {
            const { id } = req.params;
            const { reviewText, rating } = req.body;
            const review = await Reviews.findByPk(id);
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            review.reviewText = reviewText || review.reviewText;
            review.rating = rating || review.rating;
            await review.save();
            res.json(review); // Ensure response is returned correclty
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteReview: async (req, res) => {
        try {
            const { id } = req.params;
            const review = await Reviews.findByPk(id);
            if (!review) {
                return res.status(404).json({ message: 'Review not found' });
            }
            await review.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default ReviewsController;
