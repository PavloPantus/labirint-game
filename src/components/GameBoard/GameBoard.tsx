import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import StyledBoardIndicator from '../BoardIndicator/BoardIndicator';
import BoardSquare from '../BoardSquare/BoardSquare';

interface EventTarget {
  addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
  dispatchEvent(evt: Event): boolean;
  removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface SyntheticEvent {
  bubbles: boolean;
  cancelable: boolean;
  currentTarget: EventTarget;
  defaultPrevented: boolean;
  eventPhase: number;
  isTrusted: boolean;
  nativeEvent: Event;
  preventDefault(): void;
  stopPropagation(): void;
  target: EventTarget;
  timeStamp: Date;
  type: string;
}

const StyledGameBoard = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border: 1px solid red;
  .start-new-game-container {
  display: flex;
  justify-content: center;
  align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    height: 100%;
    background-color: rgba(126,126,126,0.3);
  }
  .start-new-game-button {
    border: 1px solid black;
    padding: 10px;
    cursor: pointer;
    &:hover {
      background-color: darkred;
    }
  }
  .top-indicators {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-left: 40px;
  }
  .container-board-indicators-and-squares {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .side-indicators{
    margin-top: 20px;
    height: calc(100% - 40px);
    width: 20px;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
  .container-for-squares{
    margin-top: 20px;
    margin-left: 20px;
    flex-grow: 1;
    height: calc(100% - 40px);
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
  }
`;

interface GameBoardProps {
  startSquare: number | undefined,
  endSquare: number | undefined,
  setNewGameStarted: (newGameStarted: boolean)=>void,
  setGameStarted: (gameStarted: boolean)=>void,
}

const GameBoard: React.FC <GameBoardProps> = (
  {
    startSquare,
    endSquare,
    setNewGameStarted,
    setGameStarted,
  }
) => {
  const [playerclickedIndex, setplayerclickedIndex] = useState< number | undefined >(undefined);
  const [askForNewGame, setAskForNewGame] = useState(false);

  useEffect(() => {
    if (playerclickedIndex) {
      setAskForNewGame(true);
    }
  }, [playerclickedIndex]);

  const boardSquares: Array<number> = useMemo(() => {
    const array: Array<number|undefined> = [];

    array.length = 9;
    array.fill(1);

    return array.map((el, i) => i + 1);
  }, []);

  return (
    <StyledGameBoard>
      {
        askForNewGame && (
          <div className="start-new-game-container">
            <button
              className="start-new-game-button"
              onClick={() => {
                setplayerclickedIndex(undefined);
                setAskForNewGame(false);
                setNewGameStarted(true);
              }}
            >
              Start new game
            </button>
            <button
              className="start-new-game-button"
              onClick={() => {
                setplayerclickedIndex(undefined);
                setAskForNewGame(false);
                setGameStarted(false);
                setNewGameStarted(true)
              }}
            >
              exit
            </button>
          </div>
        )

      }

      <div className="top-indicators">
        {
          ['A', 'B', 'C']
            .map(
              item => (
                <StyledBoardIndicator key={item} height="20px" indicateOn={item} />
              )
            )
        }
      </div>
      <div className="container-board-indicators-and-squares">
        <div className="side-indicators">
          {
            [1, 2, 3]
              .map(
                item => <StyledBoardIndicator key={item} height="100%" indicateOn={item} />
              )
          }

        </div>

        <div
          className="container-for-squares"
        >
          {
            boardSquares
              .map(
                (square, i) => (
                  <BoardSquare
                    key={square + i}
                    onclickCallback={() => {
                      if (endSquare) {
                        setplayerclickedIndex(i + 1);
                      }
                    }}

                    backgroundColor={
                      playerclickedIndex === endSquare
                      && playerclickedIndex === i + 1
                        ? 'green'
                        : playerclickedIndex === i + 1 ? 'red' : ''
                    }

                    innerValue={
                      (() => {
                        if (i + 1 === startSquare && i + 1 === endSquare && playerclickedIndex) {
                          return 'START END';
                        }

                        if (i + 1 === startSquare) {
                          return 'START';
                        }

                        if (i + 1 === endSquare && playerclickedIndex) {
                          return 'END';
                        }
                      })()
                    }
                  />
                )
              )
          }
        </div>
      </div>
    </StyledGameBoard>
  );
};

export default GameBoard;
