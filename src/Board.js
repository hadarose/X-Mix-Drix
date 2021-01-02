import Square from "./Square";
import { Component } from "react";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { squares: Array(9).fill(null), xNext: true };
  }

  handlePlay(i) {
    // Creating a new array and leaving the state's one immutuable
    let squares = this.state.squares.slice();
    const isWin = winCheck(this.state.squares);

    if (isWin) {
      return;
    }

    squares[i] = this.state.xNext ? "X" : "O";
    this.setState({ squares: squares, xNext: !this.state.xNext });
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handlePlay(i)}
      />
    );
  }

  render() {
    let winner = winCheck(this.state.squares);
    let status = winner
      ? `${winner} is the Winner!`
      : `${this.state.xNext ? "X" : "O"}, it's your turn!`;

    return (
      <div>
        <h3>{status}</h3>
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
        <div>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;

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
