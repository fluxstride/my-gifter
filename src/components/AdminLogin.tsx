/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { FormEventHandler, useState } from 'react';
import './AdminLogin.css';
import useAuth from '../hooks/useAuth';

function AdminLogin() {
  const { login, loading } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState('');

  const onSubmit = (async e => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await login(username, password);
  }) as FormEventHandler;

  return (
    <div className="container">
      <div className="heading">
        <h5>
          ATUKU-OWEI / MUMMY QUEEN DYNASTY AND IN-LAWS YEAR 2024 FAMILY GIFTING.
        </h5>
      </div>
      <h1 className="login-heading">Admin Login</h1>
      <div className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              Username:
              <input
                type="text"
                id="username"
                name="username"
                required
                value={username}
                onChange={e => {
                  setUsername(e.target.value);
                }}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            </label>
          </div>
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? 'Logging in' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
