import React from 'react';
import styled from 'styled-components';

const StyledBoardSquare = styled.div`
  height: 100%;
  width: 100%;
  background-color: #c595ff;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface BoardSquareProps {
  innerValue?: string,
}

const BoardSquare: React.FC <BoardSquareProps> = (
  {
    innerValue,
  }
) => (
  <StyledBoardSquare>
    {innerValue}
  </StyledBoardSquare>
);

export default BoardSquare;
