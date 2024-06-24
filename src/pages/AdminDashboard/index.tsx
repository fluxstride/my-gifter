/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FormEventHandler, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import style from './style.module.css';
import API from '../../api';
import useAuth from '../../hooks/useAuth';

function Loader() {
  return <div className={style.loader} />;
}

interface User {
  id: string;
  name: string;
  code: string;
  pickedBy: string | null;
  hasPicked: boolean;
}

interface UsersAPIResponse {
  data: { data: { gifters: User[] } };
}

interface ErrorResponse {
  response: {
    data: { message: string };
  };
}

function AdminDashboard() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [showAddModal, setshowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingAddUser, setLoadingAddUser] = useState(false);
  const [loadingEditUser, setLoadingEditUser] = useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response: UsersAPIResponse = await API.get('/gifters');

        setUsers(response.data.data.gifters);
      } catch (error) {
        toast.error((error as { message: string }).message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers().catch(() => {});
  }, []);

  const resetInputs = () => {
    setName('');
    setCode('');
  };

  const openAddModal = () => {
    setshowAddModal(true);
  };

  const closeAddModal = () => {
    setshowAddModal(false);
    resetInputs();
  };

  const openEditModal = (user: User) => {
    setName(user.name);
    setCode(user.code);
    setUserIdToEdit(user.id);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setUserIdToEdit('');

    resetInputs();
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleAddUser: FormEventHandler = async e => {
    e.preventDefault();
    let loadingId;

    try {
      loadingId = toast.loading('Adding user');
      setLoadingAddUser(true);
      const response: UsersAPIResponse = await API.post('/gifters', {
        name,
        code,
      });

      setUsers(response.data.data.gifters);
      toast.success('User added successfully');
    } catch (error) {
      toast.error((error as ErrorResponse).response.data.message);
    } finally {
      closeAddModal();
      setLoadingAddUser(false);
      toast.dismiss(loadingId);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  const handleEditUser = async (userId: string) => {
    let loadingId;

    try {
      loadingId = toast.loading('Processing you request');
      setLoadingEditUser(true);
      const response: UsersAPIResponse = await API.patch(`/gifters/${userId}`, {
        name,
        code,
      });

      setUsers(response.data.data.gifters);
      toast.success('User updated successfully');
    } catch (error) {
      toast.error((error as ErrorResponse).response.data.message);
    } finally {
      closeEditModal();
      setLoadingEditUser(false);
      toast.dismiss(loadingId);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      setLoadingEditUser(true);
      toast.loading('Deleting user', { id: 'deleting' });

      const response: UsersAPIResponse = await API.delete(`/gifters/${userId}`);
      setUsers(response.data.data.gifters);
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error((error as ErrorResponse).response.data.message);
    } finally {
      toast.dismiss('deleting');
      setLoadingEditUser(false);
    }
  };

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
            <div>
              <button
                type="button"
                onClick={openAddModal}
                className={style.addUser}
              >
                Add user +
              </button>

              {showAddModal && (
                <div
                  className={style.modalBackdrop}
                  onClick={e => {
                    if (e.currentTarget === e.target) {
                      closeAddModal();
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  onKeyDown={() => {}}
                >
                  <div className={style.modal}>
                    <div className={style.modalHeader}>
                      <h2>Add User</h2>

                      <button
                        type="button"
                        className={style.modalClose}
                        onClick={closeAddModal}
                      >
                        X
                      </button>
                    </div>

                    <form onSubmit={handleAddUser}>
                      <label htmlFor="name">
                        Name
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={e => {
                            setName(e.target.value);
                          }}
                          required
                        />
                      </label>

                      <label htmlFor="code">
                        Code
                        <input
                          type="number"
                          name="code"
                          maxLength={3}
                          value={code}
                          onChange={e => {
                            setCode(e.target.value);
                          }}
                          required
                        />
                      </label>

                      <button type="submit" disabled={loadingAddUser}>
                        {!loadingAddUser ? 'Submit' : 'Submitting..'}
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
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
                          <button
                            className={style.delete}
                            type="button"
                            onClick={() => {
                              openEditModal(user);
                            }}
                          >
                            Edit User
                          </button>

                          <button
                            className={style.edit}
                            type="button"
                            onClick={() => {
                              deleteUser(user.id).catch(() => {});
                            }}
                          >
                            Remove x
                          </button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showEditModal && (
        <div
          className={style.modalBackdrop}
          onClick={e => {
            if (e.currentTarget === e.target) {
              closeEditModal();
            }
          }}
          tabIndex={0}
          role="button"
          onKeyDown={() => {}}
        >
          <div className={style.modal}>
            <div className={style.modalHeader}>
              <h2>Edit User</h2>

              <button
                type="button"
                className={style.modalClose}
                onClick={closeEditModal}
              >
                X
              </button>
            </div>

            <form
              onSubmit={event => {
                event.preventDefault();
                handleEditUser(userIdToEdit).catch(() => {});
              }}
            >
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                  required
                />
              </label>

              <label htmlFor="code">
                Code
                <input
                  type="number"
                  name="code"
                  value={code}
                  onChange={e => {
                    setCode(e.target.value);
                  }}
                  required
                />
              </label>

              <button type="submit" disabled={loadingEditUser}>
                {!loadingEditUser ? 'Submit' : 'Submitting..'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
