import './AdminLogin.css';

function AdminLogin() {
  return (
    <div className="container">
      <div className="heading">
        <h5>
          ATUKU-OWEI / MUMMY QUEEN DYNASTY AND IN-LAWS YEAR 2024 FAMILY GIFTING.
        </h5>
      </div>
      <h1>Admin Login</h1>
      <div className="form">
        <form>
          <div className="form-group">
            <label htmlFor="username">
              Username:
              <input type="text" id="username" name="username" required />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password:
              <input type="password" id="password" name="password" required />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
