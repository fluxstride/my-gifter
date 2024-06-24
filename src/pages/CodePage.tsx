import { useState } from 'react';
import './CodePage.css';
import toast from 'react-hot-toast';
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

function CodePage() {
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
      <div className="gifter">
        <h1> You picked 🤝</h1>

        <div className="name"> {pickedUser.name}</div>
      </div>
    );
  }

  if (picker && users) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h2>Pick a number from the list</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {users.map((user, index) => (
            <button
              type="submit"
              key={user.id}
              onClick={() => {
                pick(picker.id, user.id).catch(() => {});
              }}
              style={{
                border: '1px solid black',
                padding: '10px',
                margin: '10px',
                width: '200px',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="intro-container">
        <h1>
          {' '}
          ATUKU-OWEI /MUMMY QUEEN DYNASTY AND IN-LAW&apos;S YEAR 2024 FAMILY
          GIFTING{' '}
        </h1>
      </div>
      <div className="form-container">
        <form
          onSubmit={e => {
            e.preventDefault();
            onCodeSubmit().catch(() => {});
          }}
        >
          <label htmlFor="code" className="input-label">
            Enter Code:
            <input
              placeholder="Enter Code Here.."
              type="number"
              id="code"
              required
              value={code}
              onChange={e => {
                setCode(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="code-buttons">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default CodePage;
