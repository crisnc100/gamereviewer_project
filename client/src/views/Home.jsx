import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    axios
      .post("http://localhost:8000/api/register", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.errors);
      });
  };

  return (
    <div className="container w-75 mt-4">
      <h1 className="mb-4 text-primary text-center">Game Reviews</h1>
      <div className="row d-flex justify-content-between">
        <div className="col-5 bg-dark p-4">
          <h1 className="text-primary">Register</h1>
          <form className="text-light" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="htmlForm-label">
                First Name:
              </label>
              <input
                type="text"
                className="form-control"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                name="last_name"
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
          <form className="text-light">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input type="email" className="form-control" name="email" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input type="password" className="form-control" name="password" />
            </div>
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
