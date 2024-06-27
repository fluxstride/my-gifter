/* eslint-disable jsx-a11y/control-has-associated-label */
import style from './adminDashboard.module.css';
import EditUser from '../../components/actions/EditUser';
import AddUser from '../../components/actions/AddUser';
import RemoveUser from '../../components/actions/RemoveUser';
import useUsersContext from '../../hooks/useUsersContext';
import useAuthContext from '../../hooks/useAuthContext';

function Loader() {
  return <div className={style.loader} />;
}

function AdminDashboard() {
  const { logout } = useAuthContext();
  const { loading, users } = useUsersContext();

  return (
    <>
      <div className={style.heading}>
        <div className={style.container}>
          <div>
            <h1>Dashboard</h1>
            <p className={style.headingText}>Welcome, Admin</p>
          </div>

          <span>
            <button
              type="button"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </span>
        </div>
      </div>

      <div className={style.container}>
        <div className={style.tableHeader}>
          <h2>Users List</h2>

          <span>
            <AddUser />
          </span>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <div className={style.tableContainer}>
            <table className={style.usersTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Picked by</th>
                  <th>Has picked</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users
                  ? users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.code}</td>
                        <td>{user.pickedBy ?? '-'}</td>
                        <td>{user.hasPicked ? 'Yes' : 'No'}</td>
                        <td className={style.actions}>
                          <EditUser userToEdit={user} />
                          <RemoveUser userId={user.id} />
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
