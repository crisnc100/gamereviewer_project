import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CreateReview from "../components/CreateReview.jsx";

const GamesPage = (props) => {
  const navigate = useNavigate();
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const { currentUser } = props; // Current User
  const passUserId = currentUser; // Pass user id to CREATE REVIEW component

  ////////////////////////////////////////////////////////
  const [currentRental, setCurrentRental] = useState({});
  ////////////////////////////////////////////////////////

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/allGames")
      .then((res) => {
        console.log("Line 32: GamesPage.jsx ", res.data);
        setGames(res.data); // This sets the game state to the fetched games from API
        setFilteredGames(res.data);
        // Extracting genres from the fetched games
        const allGenres = Array.from(
          new Set(res.data.flatMap((game) => game.genre.split(", ")))
        );
        setGenres(allGenres); // Set the genres state with the extracted genres
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      // Filter games by the selected genre
      setFilteredGames(
        games.filter((game) => game.genre.includes(selectedGenre))
      );
    } else {
      setFilteredGames(games);
    }
  }, [selectedGenre, games]);

  // Handle game rental
  const rentalHandler = (gameId) => {
    axios
      .post(
        `http://localhost:8000/api/rental/${gameId}`,
        { userId: currentUser.id },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Game rented");
        // This will update the game state to reflect the new rental status
        setGames(
          games.map((game) =>
            game.id === gameId
              ? { ...game, isRented: true, userId: currentUser.id }
              : game
          )
        );
      })
      .catch((error) => {
        alert(`${error.response.data.message}`);
        console.log("Line 36: CreateReview.jsx ", error.response.data);
      });
  };

  // This handles the return game, also had to change to "put" since were updating the condition its in.
  const returnHandler = (rentalId) => {
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    console.log("UserId:", currentUser.id, "RentalId:", rentalId);
    // Wanted to use a get post to grab the current rent
    axios
      .get(
        `http://localhost:8000/api/rental/users/${currentUser.id}`,
        { gameId: rentalId },
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Line 69: GamesPage.jsx ", res.data);
        setCurrentRental(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    axios
      .put(
        `http://localhost:8000/api/return/${currentRental.id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log("Game returned");
        setGames(
          games.map((game) =>
            game.id === rentalId
              ? { ...game, isRented: false, userId: null }
              : game
          )
        );
      })
      .catch((error) => {
        alert(`${error.response.data.message}`);
        console.log("Line 84: CreateReview.jsx ", error.response.data);
      });
  };

  return (
    <div className="container">
      <h1>All Games</h1>
      <div>
        <p>* Sort by genre</p>
        <select
          onChange={(e) => setSelectedGenre(e.target.value)}
          value={selectedGenre}
        >
          <option value="">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <p>Current User's ID: {currentUser.id}</p>
      <table className="table table-secondary table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Rent</th>
            <th>Review</th>
            <th>Favorite</th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map((game) => (
            <tr key={game.id}>
              <td>{game.title}</td>
              <td>
                {game.isRented && game.userId === currentUser.id ? (
                  <button
                    onClick={() => returnHandler(game.id)}
                    className="btn btn-warning"
                  >
                    Return
                  </button>
                ) : (
                  <button
                    onClick={() => rentalHandler(game.id)}
                    className="btn btn-primary"
                    disabled={game.isRented}
                  >
                    Rent
                  </button>
                )}
              </td>
              {/* <td>
                                <CreateReview passUserId={passUserId.id} gameId={game.id} gameTitle={game.title} />
                            </td> */}
              <td>
                <button className="btn btn-info">Favorite</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{currentRental.id}</h2>
    </div>
  );
};

export default GamesPage;
