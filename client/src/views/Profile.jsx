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
  console.log(favoriteGames.Game.title);

  // // Grabbing current rentals by the currentUser
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:8000/api/rentals/users/${currentUser.id}`)
  //     .then((res) => {
  //       console.log("Line 20: GamesPage.jsx ", res.data);
  //       setRentedGames(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Rented Games</h2>
              {/* <ul className="list-group">
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
              </ul> */}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Favorite Games</h2>
              <p>{favoriteGames.Game.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
