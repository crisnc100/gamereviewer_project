const Home = () => {
  return (
    <div className="container w-75 mt-4">
      <h1 class="mb-4 text-primary text-center">Game Reviews</h1>
      <div className="row d-flex justify-content-between">
        <div class="col-5 bg-dark p-4">
          <h1 class="text-primary">Register</h1>
          <form class="text-light">
            <div class="mb-3">
              <label for="first_name" class="form-label">
                First Name:
              </label>
              <input type="text" class="form-control" name="first_name" />
            </div>
            <div class="mb-3">
              <label for="last_name" class="form-label">
                Last Name:
              </label>
              <input type="text" class="form-control" name="last_name" />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">
                Email:
              </label>
              <input type="email" class="form-control" name="email" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password:
              </label>
              <input type="password" class="form-control" name="password" />
            </div>
            <div class="mb-3">
              <label for="confirm_password" class="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                class="form-control"
                name="confirm_password"
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Register
            </button>
          </form>
        </div>
        <div class="col-5 bg-dark p-4">
          <h1 class="text-success">Login</h1>
          <form class="text-light">
            <div class="mb-3">
              <label for="email" class="form-label">
                Email:
              </label>
              <input type="email" class="form-control" name="email" />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">
                Password:
              </label>
              <input type="password" class="form-control" name="password" />
            </div>
            <button type="submit" class="btn btn-success">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
