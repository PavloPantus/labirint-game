import React, { useState } from 'react';
import './App.scss';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import GameBoard from './components/GameBoard/GameBoard';
import StepsPanel from './components/StepsPanel/StepsPanel';

const StyledApp = styled.section`
  .game-heading {
    font-size: 20px;
    margin:  0 auto;
    text-align: center;
  }
  .game-board-container {
     position:relative;
     max-width: 400px;
     min-height: 300px;
     margin-top: 50px;
     margin-right: auto;
     margin-left: auto;
  }
  .steps-panel-container {
    max-width: 300px;
    margin-top: 20px;
    margin-right: auto;
    margin-left: auto;
  }
  .game-start-button {
    padding: 10px;
    border-radius: 1px;
    background-color: azure;
    border: 1px solid gray;
    outline: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    &:hover {
    background-color: aliceblue;
    cursor: pointer;
    }
  }
  /* This fires as soon as the element enters the dorm */
.list-transition-enter,
.list-transition-appear {
  /*We give the list the initial dimension of the list button*/
 transform: rotateX(90deg);
 transform: rotateY(90deg);
 
}
/* This is where we can add the transition*/
.list-transition-enter-active,
.list-transition-appear-active {
  transform: rotateX(0deg);
  transform: rotateY(0deg);
  transition: all 2000ms;
}

/* This fires as soon as the this.state.showList is false */
.list-transition-exit {
 transform: rotateX(0deg);
  background-color: #9e8949;
}
/* fires as element leaves the DOM*/
.list-transition-exit-active {
  transform: rotateX(90deg);
  transition: all 2000ms;
}
`;

const App: React.FC = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [startSquare, setStartSquare] = useState<undefined|number>(undefined);
  const [endSquare, setEndSquare] = useState<undefined|number>(undefined);
  const [newGameStarted, setNewGameStarted] = useState(false);

  return (
    <StyledApp>
      <h1 className="game-heading">Лабиринт</h1>
      <div className="game-board-container">
        {
          !gameStarted && (
            <button
              type="button"
              onClick={() => {
                setGameStarted(true);
              }}
              className="game-start-button"
            >
              Играть
            </button>
          )
        }
        <CSSTransition
          in={gameStarted}
          timeout={2000}
          classNames="list-transition"
          unmountOnExit

        >
          <GameBoard
            setGameStarted={setGameStarted}
            setNewGameStarted={setNewGameStarted}
            startSquare={startSquare}
            endSquare={endSquare}
          />
        </CSSTransition>

      </div>
      <div className="steps-panel-container">
        <StepsPanel
          gameStarted={gameStarted}
          newGameStarted={newGameStarted}
          setNewGameStarted={setNewGameStarted}
          setStartSquare={setStartSquare}
          setEndSquare={setEndSquare}
        />
      </div>
    </StyledApp>

  );
};

export default App;
