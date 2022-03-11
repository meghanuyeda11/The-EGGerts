import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login'
import useLogin from './components/useLogin';
import { allWords } from './AllWords.js'
import Instructions from './components/instructions';
import { useState } from 'react';

const UCLAWords = ['alpha', 'bears', 'bells', 'bikes', 'birds', 'blaze', 'block', 'books', 'brick', 'bruin',
'carey', 'cedar', 'chess', 'claps', 'class', 'clock', 'clubs', 'court', 'covid', 'david', 'delta', 'diddy', 'dorms', 'drake', 'drive', 'drugs', 'duffl',
'emacs', 'field', 'fight', 'final', 'flyer', 'frats', 'games', 'gamma', 'geeks', 'grade', 'halls', 'hills', 'hitch', 'house', 'ipads',
'janss', 'kappa', 'learn', 'major', 'masks', 'nerds', 'notes', 'omega', 'party', 'piano', 'planb', 'plate', 'poker',
'rende', 'riese', 'rocco', 'rodeo', 'royce', 'rugby', 'saxon', 'ships', 'sigma', 'snaps', 'sport', 'stair', 'steps', 'stone', 'study', 'theta',
'undie', 'union', 'venmo', 'vodka', 'vista', 'xcode', 'yells', 'yerba', 'zelle', 'bruin'];

//choosing the answer for the game
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
var answer = UCLAWords[getRandomInt(80)];
// var answer = "emacs";

var canMoveOn = false;  //says if the next row is typeable
var gameIsDone = false; //says if the game is over or not

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var text = sessionStorage.getItem("jeffrey_loewe");
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

  enterCharacter(event) { 
    if (gameIsDone) {
      this.changeBGColor();
      this.answerMessage();
      return;
    }
    if (event.key === 'Enter') {
      if (this.state.currentCell == (this.state.currentRow*5)) { // reached end of row
        this.checkWord();
        if (canMoveOn) {
          this.setState({currentRow: this.state.currentRow+1, currentCell: this.state.currentCell});
          canMoveOn = false;
          if(this.state.currentCell == 30 && !gameIsDone) {
            alert("The word was " + answer + ". Your mom should've used a Trojan.");
          } 
        } 
      }
    } else if (event.key === 'Backspace') {
      this.delCharacter();
    } else if (event.keyCode < 65 || event.keyCode > 90) { // non-alpha
      alert("Invalid character entered");
      return
    } else { // insert character into tile
      if (this.state.currentCell < (this.state.currentRow*5)) {
        const newVals = this.state.cellVals.slice(); // copy the array
        newVals[this.state.currentCell] = event.key.toUpperCase(); 
        this.setState({cellVals: newVals, currentCell: this.state.currentCell+1});
      }
    }
    this.changeBGColor();
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
    gameIsDone = true;
    if(this.state.currentRow == 1) {
      alert("Did you Chegg that?\nAnswer: " + answer + "\nRefresh your page to play again."); //Cancel your imposter syndrome, you're a genius
    } else if (this.state.currentRow == 2) {
      alert("Weeder classes don't even phase you\nAnswer: " + answer + "\nRefresh your page to play again."); 
    } else if (this.state.currentRow == 3) {
      alert("Curve setter *eye rolls*\nAnswer: " + answer + "\nRefresh your page to play again.");
    } else if (this.state.currentRow == 4) {
      alert("You skipped your writing 1 credit, didn't you #smarty.\nAnswer: " + answer + "\nRefresh your page to play again.");
    } else if (this.state.currentRow == 5) {
      alert("Don't worry, you'll benefit from the curve.\nAnswer: " + answer + "\nRefresh your page to play again.");
    } else {
      alert("That was close, you were almost as big of a loser as USC students.\nAnswer: " + answer + "\nRefresh your page to play again.");
    }
  }

  checkWord() {
    var currentWord = this.createString();
    if(currentWord == answer) {
      //have every square turn blue since word is completely correct
      const newColors = this.state.cellColors.slice();
      for(let i = this.state.currentCell - 5; i < this.state.currentCell; i++) {
        newColors[i] = "#2774AE";
        this.setState({cellVals: this.state.cellVals, currentCell: this.state.currentCell-1, cellColors: newColors});       
      }

      //return a victory message
      this.answerMessage();

      //update scoreboard and server
      var currentUsername = localStorage.getItem("currentUser")
      var currentValue = localStorage.getItem(currentUsername)
      if (currentValue == -1 || (currentValue > this.state.currentRow)) { // no complete or new high score
        localStorage.setItem(currentUsername, this.state.currentRow)
      } 

    } else {
      if (allWords.includes(currentWord)) {
        //have squares turn blue, yellow, or red
        const newColors = this.state.cellColors.slice();
        var tempAns = answer;

        for(let i = this.state.currentCell - 5; i < this.state.currentCell; i++) {
          let j = i % 5;
          if (currentWord.charAt(j) === answer.charAt(j)) {
            //turn blue
            newColors[i] = "#2774AE";
            let index = tempAns.indexOf(currentWord.charAt(j));
            tempAns = tempAns.substring(0, index) + tempAns.substring(index + 1);
            this.setState({cellVals: this.state.cellVals, currentCell: this.state.currentCell-1 , cellColors: newColors});
          } else if (tempAns.includes(currentWord.charAt(j))) {
            //turn yellow
            newColors[i] = "#FFD100";
            let index = tempAns.indexOf(currentWord.charAt(j));
            tempAns = tempAns.substring(0, index) + tempAns.substring(index + 1);
            this.setState({cellVals: this.state.cellVals, currentCell: this.state.currentCell-1, cellColors: newColors});
          } else {
            //turn red
            newColors[i] = "#990000";
            this.setState({cellVals: this.state.cellVals, currentCell: this.state.currentCell-1, cellColors: newColors});
          }
        }
        canMoveOn = true;
      } else {
        //throw up error message for word that is not in dictionary
        alert("Did you actually think that was a word?");
      }
    }
  } 

  delCharacter() {
    if (this.state.currentCell > (this.state.currentRow*5)-5) { // past or at beginning of row
      const newVals = this.state.cellVals.slice(); // copy the array
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

function clearAll() {
  window.sessionStorage.clear();
  alert("You've been logged out! Please refresh the page")
}

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ""};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    var username = this.state.value;
    var bestScore = localStorage.getItem(username);
    if (bestScore != null && bestScore != 0 && bestScore !== undefined) {
      console.log(JSON.stringify(bestScore))
      if (bestScore == -1){
        alert("Play the game student #" + username + ", you're better than these trojans")
      } else {
      alert("Congrats student #" + username + " your best score is " + bestScore)
      }
    } else {
      alert("This user has not been registered yet! Who are you?")
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          UID &nbsp; 
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function Game() {
  const { login, setLogin } = useLogin(false);
  const [instructions, setInstructions] = useState(false);
  if(!login) {
    return <Login setLogin={setLogin} />
  }

  return(
    <div className="game">
        <div className="game-board">
           <Board />
           <div className="button-panel">
          <button onClick={() => setInstructions(true)}>Instructions</button>
          <Instructions trigger={instructions} setTrigger={setInstructions}>
          <div class="modal-body">
              Fill in a row with a five letter word, then press "Enter". 
              If that word is found in our dictionary: 
              <p/>(1) the background of the letters within the correct word & in the right position of the word will be UCLA Blue, 
              <p/>(2) the background of the letters within the correct word but not in the correct position will be UCLA Gold, 
              <p/>(3) the remaining backgrounds will be USC Red. 
              <p/>The goal of the game is to get the all backgrounds to be UCLA Blue 
              (meaning you have guessed the correct word). 
              <p/>Good luck!! :)
            </div>
          </Instructions>
          <button onClick={clearAll} className="logout">Logout</button>
         </div>
         <div className="userForm"><NameForm /></div>
         </div>
       </div>
    
  )
}


// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


