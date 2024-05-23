import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Profile = (props) => {
  const { currentUser } = props;
  const [rentedGames, setRentedGames] = useState([]);
  const [favoriteGames, setFavoriteGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found");
      return;
    }

    console.log(currentUser.id);

    axios
      .get(`http://localhost:8000/api/favorites/${currentUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFavoriteGames(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Rented Games</h2>
              <ul className="list-group">
                {rentedGames.map((game) => (
                  <li
                    key={game.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {game.title}
                    <a href="#" className="badge bg-primary rounded-pill">
                      Return
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Favorite Games</h2>
              <ul className="list-group">
                {favoriteGames.map((favoriteGame, index) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {favoriteGame.Game.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
