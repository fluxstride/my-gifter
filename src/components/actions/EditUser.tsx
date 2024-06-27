import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import style from './actions.module.css';
import { User } from '../../types';
import useUsersContext from '../../hooks/useUsersContext';

const duration = 100;

const defaultStyle: CSSProperties = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  pointerEvents: 'none',
};

const transitionStyles: Record<TransitionStatus, CSSProperties> = {
  entering: { opacity: 1, pointerEvents: 'all' },
  entered: { opacity: 1, pointerEvents: 'all' },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: {},
};

interface EditProps {
  userToEdit: User | null | undefined;
}

function EditUser({ userToEdit }: EditProps) {
  const nodeRef = useRef(null);
  const [name, setName] = useState<string | undefined>('');
  const [code, setCode] = useState<string | undefined>('');
  const [showEditModal, setShowEditModal] = useState(false);

  const { editUser, loading } = useUsersContext();

  useEffect(() => {
    if (userToEdit) {
      setName(userToEdit.name);
      setCode(userToEdit.code);
    }
  }, [userToEdit]);

  const resetInputs = () => {
    setName('');
    setCode('');
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    resetInputs();
  };

  const handleEditUser = async (userId?: string) => {
    await editUser(name, code, userId);

    closeEditModal();
  };

  return (
    <>
      <button
        className={style.editUser}
        type="button"
        onClick={() => openEditModal()}
      >
        Edit User
      </button>

      <Transition nodeRef={nodeRef} in={showEditModal} timeout={duration}>
        {(state: TransitionStatus) => (
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
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
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
                  handleEditUser(userToEdit?.id).catch(() => {});
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

                <button type="submit" disabled={loading}>
                  {!loading ? 'Submit' : 'Submitting..'}
                </button>
              </form>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
}

export default EditUser;
