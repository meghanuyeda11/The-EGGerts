import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login'
import useLogin from './components/useLogin';

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Wordle - UCLA Edition';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="button-panel">
          <button>instructions</button>
          <button>logout</button>
          <button>update leaderboard</button>
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
        </div>
        <div className="board-row">
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
          {this.renderSquare(9)}
        </div>
        <div className="board-row">
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
        </div>
        <div className="board-row">
          {this.renderSquare(15)}
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
        </div>
        <div className="board-row">
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}
          {this.renderSquare(24)}
        </div>
        <div className="board-row">
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
        </div>
      </div>
    );
  }
}

function Game() {
  const { login, setLogin } = useLogin();
  
  if(!login) {
    return <Login setLogin={setLogin} />
  }

  return(
    <div className="game">
        <div className="game-board">
           <Board />
         </div>
         <div className="game-leaderboard">
           <div>{"Leaderboard:"}</div>
           <ol>
             <li>Insert #1</li>
             <li>Insert #2</li>
             <li>Insert #3</li>
             <li>Insert #4</li>
             <li>Insert #5</li>
             <li>Insert #6</li>
             <li>Insert #7</li>
             <li>Insert #8</li>
             <li>Insert #9</li>
             <li>Insert #10</li>
           </ol>
         </div>
       </div>
    
  )
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
