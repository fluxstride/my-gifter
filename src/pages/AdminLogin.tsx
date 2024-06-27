import { FormEventHandler, useState } from 'react';
import style from './AdminLogin.module.css';
import useAuthContext from '../hooks/useAuthContext';

function AdminLogin() {
  const { login, loading } = useAuthContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault();
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
