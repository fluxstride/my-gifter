import './CodePage.css';
import giftImage from './logo/image.png';

function CodePage() {
  return (
    <div>
      <header>
        <div className="header">
          <img src={giftImage} className="image" alt="gift" />
          <p>My Gifter</p>
        </div>
      </header>
      <main>
        <div className="gift-title">
          <h1>2024 FAMILY GIFTING</h1>
        </div>
        <div className="form-container">
          <form className="code-form">
            <label className="code-label" htmlFor="code">
              Enter Code
              <input
                className="code-input"
                placeholder="...#123"
                type="number"
                id="code"
                required
              />
            </label>
            <button className="code-submit-btn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </main>
      <footer>
        <div className="footer">
          <p>ATUKU-OWI/QUEEN DYNASTY AND IN LAWS</p>
        </div>
      </footer>
    </div>
  );
}
export default CodePage;
