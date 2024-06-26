// to test button onClick
// function displayConsole(num: number) {
//   // alert(`You clicked ${num}`);
// }

function NumberList() {
  let count = 1;
  const numbers = [];
  // creates 20
  while (count <= 20) {
    numbers.push(count);
    count += 1;
  }
  // console.log(numbers);

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
        {numbers.map(num => (
          <button
            type="submit"
            key={num}
            onClick={() => {
              // displayConsole(num);
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
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default NumberList;
