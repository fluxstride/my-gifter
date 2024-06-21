import './CodePage.css';

function CodePage() {
  /* const [number, setNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = event => {
    setNumber(event.target.value);
    setError('');
  };
  const handleSubmit = async event => {
    event.preventDefault();

    if (!number) {
      setError('Number is required');
      return;
    }

    try {
      // Replace with your backend endpoint
      const response = await axios.post('/api/validate-number', { number });

      if (response.data.exists) {
        navigate('/different-page');
      } else {
        setError('Number does not exist in the database');
      }
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 200 range
        setError(`Server error: ${err.response.data.message}`);
      } else if (err.request) {
        // Request was made but no response received
        setError('Network error: Please try again later');
      } else {
        // Something else happened while setting up the request
        setError(`Error: ${err.message}`);
      }
    }
  };
*/
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
        <form>
          <label htmlFor="code">
            Enter Code:
            <input
              placeholder="Enter Code Here.."
              type="number"
              id="code"
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default CodePage;
