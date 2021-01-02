import Board from "./Board";
import { Component } from "react";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xNext: true,
      turn: 0,
    };
  }

  handlePlay(i) {
    // Creating a new array and leaving the state's one immutuable
    const history = this.state.history.slice(0, this.state.turn + 1);
    const lastBoard = history[history.length - 1];
    const squares = lastBoard.squares.slice();

    if (winCheck(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]),
      xNext: !this.state.xNext,
      turn: history.length,
    });
  }

  goToMove(moveNumber) {
    this.setState({
      turn: moveNumber,
      xNext: moveNumber % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const lastBoard = history[this.state.turn];
    const winner = winCheck(lastBoard.squares);

    let lastMoves = history.map((lastMove, index) => {
      const step = index ? "Move No: " + index : "Go to Beginning";
      return (
        <li key={index}>
          <button onClick={() => this.goToMove(index)}>{step}</button>
        </li>
      );
    });
    let status = winner
      ? `${winner} is the Winner!`
      : `${this.state.xNext ? "X" : "O"}, it's your turn!`;
    return (
      <div>
        {status}
        <Board
          squares={lastBoard.squares}
          handlePlay={(i) => this.handlePlay(i)}
        />
        <ul>{lastMoves}</ul>
      </div>
    );
  }
}

export default Game;

// Assist Function to calculate a win
function winCheck(board) {
  const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winCombo.length; i++) {
    const [a, b, c] = winCombo[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}
