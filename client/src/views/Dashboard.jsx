import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const {currentUser} = props

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found");
            return;
        }

        axios
            .get("http://localhost:8000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                console.log(res.data);
                setUsers(res.data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.message);
            });
    }, []);

    const logoutHandler2 = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
            .then((res) => {
                navigate('/')
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Temporary navigate to /dashboard/search-games

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <h3>Welcome {currentUser.firstName}</h3>
            <button onClick={logoutHandler2}>Logout</button>
            <p><Link to={'/dashboard/search-games'}>Games Dashboard</Link></p>

            <table className="table table-secondary table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
