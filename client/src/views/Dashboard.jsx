import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = (props) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const { currentUser } = props;
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found");
            return;
        }

        axios
            .get("http://localhost:8000/api/allReviews", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setReviews(res.data);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    return (
        <div className="container">
            <h1>Welcome {currentUser.firstName}!</h1>
            <h3 className="text-center">User Reviews</h3>
            <div className=" d-flex flex-column align-items-center">
                {reviews.map((review, index) => (
                    <div key={index} className="border-bottom border-secondary w-75 p-3">
                        <h4 className="fw-bold">
                            {review.User.firstName} {review.User.lastName} on{" "}
                            {review.Game.title}
                        </h4>
                        <p>{review.reviewText}</p>
                        <p>{new Date(review.created_at).toLocaleDateString()}</p>
                        <p>{review.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
