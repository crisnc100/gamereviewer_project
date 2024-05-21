import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const { userUpdater } = props

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        firstName,
        lastName,
        email,
        password,
      });
      console.log(response);
      console.log(response.data);
      console.log(response.data.token);

      if (response.data.token) {
        console.log("LINE 35: Home.jsx", response.data)
        localStorage.setItem("token", response.data.token);
        // Update user
        userUpdater(response.data.user)
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred during registration.");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email: loginEmail,
        password: loginPassword,
      });
      console.log(response.data);
      console.log('Line 57: Home.jsx ', response.data.token);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Update user
        userUpdater(response.data.user)
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password.");
    }
  };


  return (
    <div className="container w-75 mt-4">
      <h1 className="mb-4 text-primary text-center">Game Reviews</h1>
      <div className="row d-flex justify-content-between">
        <div className="col-5 bg-dark p-4">
          <h1 className="text-primary">Register</h1>
          <form className="text-light" onSubmit={handleRegister}>
            <div className="mb-3">
              <label htmlFor="firstName" className="htmlForm-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm_password" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                id="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
        <div className="col-5 bg-dark p-4">
          <h1 className="text-success">Login</h1>
          <form className="text-light" onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button type="submit" className="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
