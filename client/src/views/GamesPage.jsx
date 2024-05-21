import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"

const GamesPage = (props) => {

    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [gameId, setGameId] = useState("")
    const [userId, setUserId] = useState("")

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

    // setUserId(currentUser.id)


    // Renting Handler
const rentalHandler = (e) => {
    e.preventDefault(e)

    axios.post(`http://localhost:8000/api/rental/${1}`, {userId}, {withCredentials: true})
        .then((res) => {

        })
        .catch((error) => {
            console.log('Could not rent game')
        })
}

    return (
        <div className="container">
            <h1>All Games</h1>
            <div> <p>* Sort by genre</p></div>
            <p>Current User's ID: {currentUser.id}</p>
            <button><Link to={'/dashboard'}>Home</Link></button>
            <table className="table table-secondary table-bordered">
                <thead>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.title}</td>
                            <td><button onClick={rentalHandler} class='btn btn-primary'>{game.id} Rent</button></td>
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