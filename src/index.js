/* eslint linebreak-style: ["error", "windows"] */
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import './index.css'

class Square extends React.Component {
  render () {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

class Board extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      turn: 'X',
      gameRunning: props.gameRunning
    }
  }

  handleClick (i) {
    const squares = this.state.squares.slice()
    if (!squares[i]) {
      squares[i] = this.state.turn
      const turn = this.state.turn === 'X' ? 'O' : 'X'
      this.setState({ squares, turn })
    }
  }

  renderSquare (i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          if (this.state.gameRunning) {
            this.handleClick(i)
          }
        }}
      />
    );
  }

  render () {
    const status = `Next player: ${this.state.turn}`;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  gameRunning: PropTypes.bool.isRequired
}

class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gameRunning: true
    }
  }

  render () {
    return (
      <div className="game">
        <div className="game-board">
          <Board gameRunning={this.state.gameRunning} />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
