import { useState } from 'react';
import toast from 'react-hot-toast';
import style from './PickPage.module.css';
import API from '../api';

interface User {
  id: string;
  name: string;
  code: string;
  pickedBy: string | null;
  hasPicked: boolean;
}
interface PickerResponse {
  data: {
    data: {
      picker: User;
      gifters: User[] | null;
      pickedUser: User | null;
    };
  };
}

interface PickResponse {
  data: {
    data: {
      pickedUser: User;
    };
  };
}

interface ErrorResponse {
  response: {
    data: { message: string };
  };
}

function PickPage() {
  const [code, setCode] = useState('');
  const [picker, setPicker] = useState<User | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);
  const [pickedUser, setPickedUser] = useState<User | null>(null);

  const pick = async (pickerId: string, pickedUserId: string) => {
    try {
      const response: PickResponse = await API.post('/pick', {
        pickerId,
        pickedUserId,
      });

      setPickedUser(response.data.data.pickedUser);
    } catch (error) {
      toast.error((error as ErrorResponse).response.data.message);
    }
  };

  const onCodeSubmit = async () => {
    try {
      const response: PickerResponse = await API.post('/validate-code', {
        code,
      });

      setPicker(response.data.data.picker);

      const { pickedUser: hasPickedUser } = response.data.data;

      if (hasPickedUser) {
        setPickedUser(response.data.data.pickedUser);
      }

      if (response.data.data.gifters) {
        setUsers(response.data.data.gifters);
      }
    } catch (error) {
      toast.error((error as ErrorResponse).response.data.message);
    }
  };

  if (pickedUser) {
    return (
      <div className={style.pickedUser}>
        <h1>🎊You picked🎊</h1>
        <p>{pickedUser.name}</p>
      </div>
    );
  }

  if (picker && users) {
    return (
      <div className={style.userList}>
        <h1>Pick a number from the list</h1>

        <div>
          {users.map((user, index) => (
            <button
              key={user.id}
              onClick={() => {
                pick(picker.id, user.id).catch(() => {});
              }}
              type="button"
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={style.codePage}>
      <h1>
        ATUKU-OWEI / MUMMY QUEEN DYNASTY AND IN-LAW&apos;S YEAR 2024 FAMILY
        GIFTING.
      </h1>

      <div className={style.codeForm}>
        <form
          onSubmit={e => {
            e.preventDefault();
            onCodeSubmit().catch(() => {});
          }}
        >
          <label htmlFor="code">
            Enter you code:
            <input
              type="text"
              name="code"
              onChange={e => {
                setCode(e.target.value);
              }}
              value={code}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default PickPage;
