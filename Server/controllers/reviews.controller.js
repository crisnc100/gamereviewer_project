import Reviews from '../models/reviews.model.js'; 

const ReviewsController = {
    getReviewById: async (req, res) => {
        try {
            const review = await Reviews.findByPk(req.params.id);
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
            res.json(review); // Ensure response is returned
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
