import React, { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import StyledBoardIndicator from '../BoardIndicator/BoardIndicator';
import BoardSquare from '../BoardSquare/BoardSquare';

const StyledGameBoard = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid red;
  .top-indicators {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    margin-left: 40px;
  }
  .container-board-indicators {
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
}

const GameBoard: React.FC <GameBoardProps> = (
  {
    startSquare,
    endSquare,
  }
) => {
  const [showEndSquare, setShowEndSquare] = useState(false);

  useEffect(() => {
    if (endSquare) {
     setShowEndSquare(true);
    }
  }, [endSquare]);

  const boardSquares: Array<number> = useMemo(() => {
    const array: Array<number|undefined> = [];

    array.length = 9;
    array.fill(1);

    return array.map((el, i) => i + 1);
  }, []);

  return (
    <StyledGameBoard>
      <div className="top-indicators">
        {
          ['A', 'B', 'C']
            .map(
              item => <StyledBoardIndicator height="20px" indicateOn={item} />
            )
        }
      </div>
      <div className="container-board-indicators">
        <div className="side-indicators">
          {
            [1, 2, 3]
              .map(
                item => <StyledBoardIndicator height="100%" indicateOn={item} />
              )
          }

        </div>

        <div className="container-for-squares">
          {
            boardSquares
              .map(
                (square, i) => (
                  <BoardSquare
                    innerValue={
                      (() => {
                        if (i + 1 === startSquare && i + 1 === endSquare && showEndSquare) {
                          return 'START END';
                        }

                        if (i + 1 === startSquare) {
                          return 'START';
                        }

                        if (i + 1 === endSquare) {
                          return 'END';
                        }
                      })()
                      // i + 1 === startSquare ? 'START' : ''
                      // || i + 1 === endSquare && showEndSquare ? 'END' : ''
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
