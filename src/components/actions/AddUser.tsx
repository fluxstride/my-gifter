import { CSSProperties, FormEventHandler, useRef, useState } from 'react';

import { Transition, TransitionStatus } from 'react-transition-group';
import style from './actions.module.css';
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

function AddUser() {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const { addUser, loading } = useUsersContext();

  const nodeRef = useRef(null);

  const resetInputs = () => {
    setName('');
    setCode('');
  };

  const openAddModal = () => {
    setShowModal(true);
  };

  const closeAddModal = () => {
    setShowModal(false);
    resetInputs();
  };

  const handleAddUser: FormEventHandler = async e => {
    e.preventDefault();
    await addUser(name, code);
    closeAddModal();
  };

  return (
    <>
      <button type="button" onClick={openAddModal} className={style.addButton}>
        Add user +
      </button>

      <Transition nodeRef={nodeRef} in={showModal} timeout={duration}>
        {(state: TransitionStatus) => (
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
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
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

                  <button type="submit" disabled={loading}>
                    {!loading ? 'Submit' : 'Submitting..'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
}

export default AddUser;
