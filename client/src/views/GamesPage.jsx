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
    const { currentUser } = props


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

        axios.post(`http://localhost:8000/api/rental/${1}`, { userId }, { withCredentials: true })
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
            <table className="table table-secondary table-bordered">
                <thead>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.title}</td>
                            <td><button onClick={rentalHandler} className='btn btn-primary'>{game.id} Rent</button></td>
                            <td>
                                {/* <button class='btn btn-success'>Write a review</button> */}
                                {/* <!-- Button trigger modal --> */}
                                <button type="button" class="btn btn-primary" data-mdb-ripple-init data-mdb-modal-init data-mdb-target="#exampleModal">
                                    Launch demo modal
                                </button>

                                {/* <!-- Modal --> */}
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                <button type="button" class="btn-close" data-mdb-ripple-init data-mdb-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">...</div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-mdb-ripple-init data-mdb-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary" data-mdb-ripple-init>Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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