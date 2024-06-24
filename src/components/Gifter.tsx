import './Gifter.css';

export default function Gifter() {
  const name = 'daniel';

  return (
    <div className="gifter">
      <h1> You picked 🤝</h1>

      <div className="name"> {name}</div>
    </div>
  );
}
