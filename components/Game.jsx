import React, { useState } from 'react';
// import { calculateWinner } from "../src/helpers.jsx";


import Board from './Board';

const styles = {
  gameContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  },
  gameBoard: {
    border: '2px solid #333',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    backgroundColor: '#f5f5f5',

    
  },
  status: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    border: '1px solid blue',
    marginTop: '10px',
    padding: '10px',
    fontFamily: 'Helvetica'
  },
  history: {
    marginTop: '20px',
    backgroundColor:'#f5f5f5'
    
    
  },
  button: {
    padding: '5px 10px',
    fontSize: '16px',
    marginRight: '10px',
    cursor: 'pointer',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    margin:'1px',
    backgroundColor: '#3C4871',
    fontFamily: 'Helvetica'
  },
  winner: {
    color: 'red',
    fontWeight: 'bold',
  },
  player: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const handleClick = (i) => {
    const timeInHistory = history.slice(0, stepNumber + 1);
    const current = timeInHistory[stepNumber];
    const squares = [...current];
    if (winner || squares[i]) return;
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...timeInHistory, squares]);
    setStepNumber(timeInHistory.length);
    setXisNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const renderMoves = () => (
    history.map((_step, move) => {
      const destination = move ? `Go to move#${move}` : 'Go to start';
      return (
        <li key={move}>
          <button
            style={styles.button}
            onClick={() => jumpTo(move)}
          >
            {destination}
          </button>
        </li>
      );
    })
  );

  return (
    <div style={styles.gameContainer}>
      <div style={styles.gameBoard}>
        <Board squares={history[stepNumber]} onClick={handleClick} />
        <div style={styles.status}>
          {winner ? (
            <span style={styles.winner}>Winner: {winner}</span>
          ) : (
            <span style={styles.player}>Next Player: {xIsNext ? 'X' : 'O'}</span>
          )}
        </div>
        <ul style={styles.history}>
          {renderMoves()}
        </ul>
      </div>
    </div>
  );
};

export default Game;
