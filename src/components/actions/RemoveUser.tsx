import useUsersContext from '../../hooks/useUsersContext';
import style from './actions.module.css';

interface RemoveUserProps {
  userId: string;
}

function RemoveUser({ userId }: RemoveUserProps) {
  const { removeUser, loading } = useUsersContext();
  return (
    <button
      className={style.deleteUser}
      type="button"
      onClick={() => {
        removeUser(userId).catch(() => {});
      }}
      disabled={loading}
    >
      Remove x
    </button>
  );
}

export default RemoveUser;
