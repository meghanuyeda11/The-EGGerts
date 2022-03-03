import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login'
import useLogin from './components/useLogin';

var textByLine = ["moons", "stars", "broom", "brisk"]; //makeshift dictionary
var answer = "bruin"; //where we will store our answer string for the day
var canMoveOn = false;  //says if the next row is typeable
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
      cellVals: ["", "", "", "", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "",
      "", "", "", "", "", "", "", "", "", ""],
      cellColors: ["#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec","#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec",
      "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec", "#ececec"]
    };
  }

  enterCharacter(event) { // new css focus class
    if (event.key === 'Enter') {
      if (this.state.currentCell == (this.state.currentRow*5)) { // reached end of row
        this.checkWord();
        this.changeBGColor();
        if (canMoveOn) {
          this.setState({currentRow: this.state.currentRow+1, currentCell: this.state.currentCell});
          canMoveOn = false;
        } else {
          this.setState({currentRow: this.state.currentRow, currentCell: this.state.currentCell});
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

  createString(){ //this takes the square inputs stored in cellVals into a string
    var string = "";
    for(let i = this.state.currentCell - 5; i < this.state.currentCell; i++) {
      string = string + this.state.cellVals[i];
    }
    return string.toLowerCase();
  }

  changeBGColor() { //this changes the squares' colors
    var cols = document.getElementsByClassName('square');
    for(let i = 0; i < cols.length; i++) {
      cols[i].style.backgroundColor = this.state.cellColors[i];
    }
  }

  answerMessage() {
    if(this.state.currentRow == 1) {
      alert("Cancel your imposter syndrome, you're a genius")
    } else if (this.state.currentRow == 2) {
      alert("Weeder classes don't even phase you")
    } else if (this.state.currentRow == 3) {
      alert("Curve setter *eye rolls*")
    } else if (this.state.currentRow == 4) {
      alert("You skipped your writing 1 credit, didn't you #smarty")
    } else if (this.state.currentRow == 5) {
      alert("Don't worry, you'll benefit from the curve")
    } else {
      alert("That was close, you were almost as big of a loser as USC students")
    }
  }

  checkWord() {
    var currentWord = this.createString();
    // alert(currentWord);
    if(currentWord == answer) {
      //have every square turn blue
      //figuring out how to know what squares need to turn
      const newColors = this.state.cellColors.slice();
      for(let i = this.state.currentCell - 5; i < this.state.currentCell; i++) {
        newColors[i] = "#2774AE";
        this.setState({cellVals: this.state.cellVals, currentCell: this.state.currentCell-1, cellColors: newColors});        
      }

      //return a yay message or something
      this.answerMessage();

      //update scoreboard and server

    } else {
      if (textByLine.includes(currentWord)) {
        // alert("In dict!");
        //have squares turn blue, yellow, or red
        const newColors = this.state.cellColors.slice();
        for(let i = this.state.currentCell - 5; i < this.state.currentCell; i++) {
          let j = i % 5;
          if (currentWord.charAt(j) === answer.charAt(j)) {
            //turn blue
            newColors[i] = "#2774AE";
            this.setState({cellVals: this.state.cellVals, currentCell: this.state.currentCell-1 , cellColors: newColors});
          } else if (answer.includes(currentWord.charAt(j))) {
            //turn yellow
            newColors[i] = "#FFD100";
            this.setState({cellVals: this.state.cellVals, currentCell: this.state.currentCell-1, cellColors: newColors});
          } else {
            //turn red
            newColors[i] = "#990000";
            this.setState({cellVals: this.state.cellVals, currentCell: this.state.currentCell-1, cellColors: newColors});
          }
        }
        canMoveOn = true;
      } else {
        //throw up error message 
        alert("Did you actually think that was a word?");
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


