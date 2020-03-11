import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledBoardIndicator from '../BoardIndicator/BoardIndicator';
import BoardSquare from '../BoardSquare/BoardSquare';


const StyledGameBoard = styled.div`
  width: 100%;
  height: 300px;
  display: grid;
  grid-template-rows: 40px 1fr 1fr 1fr;
  grid-template-columns: 40px 1fr 1fr 1fr;
  grid-gap: 10px;
`;

const GameBoard: React.FC = () => (
  <StyledGameBoard>
    <div />
    <StyledBoardIndicator indicateOn="A" />
    <StyledBoardIndicator indicateOn="B" />
    <StyledBoardIndicator indicateOn="C" />
    {
      [1, 2, 3]
        .map(
          row => (
            <React.Fragment key={row}>
              <StyledBoardIndicator indicateOn={row} height="100%" />
              {[1,2,3]
              .map(
              item => <BoardSquare key={row+item} />
              )}
            </React.Fragment>
          )
        )
    }

  </StyledGameBoard>
);

export default GameBoard;
