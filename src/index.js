import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login'
import useLogin from './components/useLogin';

const UCLAWords = ['adult', 'alpha', 'andre', 'bells', 'bikes', 'birds', 'black', 'block', 
'books', 'brick', 'bruin', 'burns','calve', 'carey', 'chair', 'chess', 'claps', 'clock', 'court', 'covid', 'david',
'delta', 'diddy', 'dorms', 'drive', 'eagle', 'eight', 'field', 'fight', 'fight', 'final', 'flyer', 'frats', 'gains', 'games', 'gamma',
'geeks', 'halls', 'hills', 'hitch', 'homes', 'ipads', 'jamba', 'kappa', 'masks', 'night', 'notes', 'omega', 'party', 'phone', 'pizza',
'plate', 'poker', 'powel', 'rocco', 'saxon', 'ships', 'sigma', 'snaps', 'sport', 'stair', 'steps', 'stone', 'study', 'table', 'theta',
'undie', 'venmo', 'vista', 'white', 'yerba', 'zelle']

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

answer = UCLAWords[getRandomInt(72)]

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="square">
        {this.props.tileContent}
      </button>
    );
  }
}

class Board extends React.Component {
  constructor() {
    super();
    this.focusRef = React.createRef();
    this.enterCharacter = this.enterCharacter.bind(this);
    this.delCharacter = this.delCharacter.bind(this);
    this.state = {
      currentCell: 0,
      currentRow: 1,
      cellVals: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "", "", ""]
    };
  }

  enterCharacter(event) { // new css focus class
    if (event.key === 'Enter') {
      if (this.state.currentCell == (this.state.currentRow*5)) { // reached end of row
        var wordExists = true; // replace with function call
        if (wordExists) { // word exists
          
          // check for correctness, otherwise cont.
          
          // change colors of current row


          this.setState({currentRow: this.state.currentRow+1}); // increment the row
        }
      }
    } else if (event.key === 'Backspace') {
      this.delCharacter();
    } else { // insert character into tile
      if (this.state.currentCell < (this.state.currentRow*5)) {
        const newVals = this.state.cellVals.slice(); // copy the array
        newVals[this.state.currentCell] = event.key.toUpperCase(); 
        this.setState({cellVals: newVals, currentCell: this.state.currentCell+1});
      }
    }
  }

  delCharacter() {
    if (this.state.currentCell > (this.state.currentRow*5)-5) { // past or at beginning of row
      const newVals = this.state.cellVals.slice(); // copy the array
      //console.log(newVals[this.state.currentCell]);
      newVals[this.state.currentCell-1] = "";
      this.setState({cellVals: newVals, currentCell: this.state.currentCell-1});
    }
  }

  componentDidMount(){
    setTimeout(() => {
      this.focusRef.current.focus();
    }, 1)
  }

  render() {
    const status = 'Wordle - UCLA Edition';
             
    return (
      <div tabIndex="0" ref={this.focusRef} onKeyDown={this.enterCharacter}> 
        <div className="status"><h1>{status}</h1></div>
        <div className="button-panel">
          <button className="instructions">instructions</button>
          <button className="logout">logout</button>
          <button className="refresh">update leaderboard</button>
        </div>
        <div className="board">
          <div className="board-row">
          <Square tileContent={this.state.cellVals[0]}/>
          <Square tileContent={this.state.cellVals[1]}/>
          <Square tileContent={this.state.cellVals[2]}/>
          <Square tileContent={this.state.cellVals[3]}/>
          <Square tileContent={this.state.cellVals[4]}/>
          </div>
          <div className="board-row">
            <Square tileContent={this.state.cellVals[5]}/>
            <Square tileContent={this.state.cellVals[6]}/>
            <Square tileContent={this.state.cellVals[7]}/>
            <Square tileContent={this.state.cellVals[8]}/>
            <Square tileContent={this.state.cellVals[9]}/>
          </div>
          <div className="board-row">
            <Square tileContent={this.state.cellVals[10]}/>
            <Square tileContent={this.state.cellVals[11]}/>
            <Square tileContent={this.state.cellVals[12]}/>
            <Square tileContent={this.state.cellVals[13]}/>
            <Square tileContent={this.state.cellVals[14]}/>
          </div>
          <div className="board-row">
            <Square tileContent={this.state.cellVals[15]}/>
            <Square tileContent={this.state.cellVals[16]}/>
            <Square tileContent={this.state.cellVals[17]}/>
            <Square tileContent={this.state.cellVals[18]}/>
            <Square tileContent={this.state.cellVals[19]}/>
          </div>
          <div className="board-row">
            <Square tileContent={this.state.cellVals[20]}/>
            <Square tileContent={this.state.cellVals[21]}/>
            <Square tileContent={this.state.cellVals[22]}/>
            <Square tileContent={this.state.cellVals[23]}/>
            <Square tileContent={this.state.cellVals[24]}/>
          </div>
          <div className="board-row">
            <Square tileContent={this.state.cellVals[25]}/>
            <Square tileContent={this.state.cellVals[26]}/>
            <Square tileContent={this.state.cellVals[27]}/>
            <Square tileContent={this.state.cellVals[28]}/>
            <Square tileContent={this.state.cellVals[29]}/>
          </div>
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

// This is where the working instruction button begins

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  if (modal == null ) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null ) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}
// This is where the working instruction button ends


