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
  const [loading, setLoading] = useState(false);

  const pick = async (pickerId: string, pickedUserId: string) => {
    let loadingId;

    try {
      setLoading(true);
      loadingId = toast.loading('Processing your selection');
      const response: PickResponse = await API.post('/pick', {
        pickerId,
        pickedUserId,
      });

      setPickedUser(response.data.data.pickedUser);
      toast.success('Selection successful');
    } catch (error) {
      toast.error((error as ErrorResponse).response.data.message);
    } finally {
      toast.dismiss(loadingId);
      setLoading(true);
    }
  };

  const onCodeSubmit = async () => {
    let loadingId;

    try {
      setLoading(true);
      loadingId = toast.loading('Validating your code');
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

      toast.success('Validation successful');
    } catch (error) {
      toast.error((error as ErrorResponse).response.data.message);
    } finally {
      toast.dismiss(loadingId);
      setLoading(false);
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
        <p>
          Hi <span className={style.pickerName}>{picker.name}</span>, please
          pick a number from the list
        </p>

        <div>
          {users.map((user, index) => (
            <button
              key={user.id}
              onClick={() => {
                pick(picker.id, user.id).catch(() => {});
              }}
              type="button"
              disabled={loading}
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
              required
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting..' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PickPage;
