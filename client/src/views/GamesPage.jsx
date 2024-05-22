import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"
import CreateReview from "../components/CreateReview.jsx"

const GamesPage = (props) => {

    const navigate = useNavigate()
    const [games, setGames] = useState([])
    const [gameId, setGameId] = useState("")
    const [userId, setUserId] = useState("")

    // Current User
    const { currentUser } = props

    // Pass user id to CREATE REVIEW component 
    const passUserId = currentUser


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

        axios.post(`http://localhost:8000/api/rental/${1}`, { userId : currentUser.id }, { withCredentials: true })
            .then((res) => {
                console.log('Game rented')
            })
            .catch((error) => {
                alert(`${error.response.data.message}`)
                console.log('Line 36: CreateReview.jsx ', error.response.data)
            })
    }

    return (
        <div className="container">
            <h1>All Games</h1>
            <div> <p>* Sort by genre</p></div>
            <p>Current User's ID: {currentUser.id}</p>
            <table className="table table-secondary table-bordered">
                <thead>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.title}</td>
                            <td><button onClick={rentalHandler} className='btn btn-primary'>{game.isRented} - Rent</button></td>
                            <td>
                                {/* <button class='btn btn-success'>Write a review</button> */}
                                <CreateReview passUserId={passUserId.id} gameId={game.id} gameTitle={game.title}/>
                            </td>
                            <td><button class='btn btn-info'> Favorite</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default GamesPage