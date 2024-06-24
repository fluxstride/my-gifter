/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FormEventHandler, useState } from 'react';
import useAuth from '../hooks/useAuth';
import style from './AdminLogin.module.css';

function AdminLogin() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { login, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await login(username, password);
  };

  return (
    <div className={style.loginForm}>
      <h1>Admin</h1>

      <form onSubmit={onSubmit}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
            }}
          />
        </label>

        <label htmlFor="username">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Loggin In...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
