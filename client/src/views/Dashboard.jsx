import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = (props) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const { currentUser } = props;

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
      <h3>Game Reviews</h3>

      <table className="table table-secondary table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>{review.User.firstName}</td>
              <td>{review.Game.title}</td>
              <td>{review.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
