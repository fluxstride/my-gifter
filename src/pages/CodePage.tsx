import './CodePage.css';
import giftImage from './logo/image.png';

function CodePage() {
  return (
    <div>
      <div className="header">
        <img src={giftImage} className="image" alt="gift" />
        <p>My Gifter</p>
      </div>
      <div className="gift-title">
        <h1>2024 FAMILY GIFTING</h1>
      </div>
      <div className="form-container">
        <form>
          <label htmlFor="code">
            Enter Code
            <input placeholder="...#123" type="number" id="code" required />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="footer">
        <p>ATUKU-OWI/QUEEN DYNASTY AND IN LAWS</p>
      </div>
    </div>
  );
}
export default CodePage;
