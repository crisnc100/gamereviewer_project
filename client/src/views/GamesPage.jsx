import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const GamesPage = (props) => {

    const navigate = useNavigate()
    const [games, setGames] = useState([])

    const [gameId, setGameId] = useState("")

    // Current User
    const {currentUser} = props

    useEffect(() => {
        axios.get('http://localhost:8000/api/allGames')
            .then((res) => {
                console.log('Line 12: GamesPage.jsx ', res)
                setGames(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])


    // Renting Handler
const rentalHandler = (e) => {
    e.preventDefault(e)

    axios.post(`http://localhost:8000/api/rent/${gameId}`, {gameId, userId}, {withCredentials: true})
        .then((res) => {

        })
        .catch((error) => {
            console.log('Could not rent game')
        })
}

    return (
        <div class="container">
            <h1>All Games</h1>
            <div> <p>* Sort by genre</p></div>

            <table class="table table-secondary table-bordered">
                <thead>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.title}</td>
                            <td><button class='btn btn-primary'>{game.isRented} Rent</button></td>
                            <td><button class='btn btn-success'>Write a review</button></td>
                            <td><button class='btn btn-info'> Favorite</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default GamesPage