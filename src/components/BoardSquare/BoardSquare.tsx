import React from 'react';
import styled from 'styled-components';

const StyledBoardSquare = styled.div`
  height: 100%;
  width: 100%;
  background-color: #c595ff;
  border-radius: 3px;
`

const BoardSquare: React.FC = () => {

  return (
    <StyledBoardSquare>
    </StyledBoardSquare>
  );
}

export default BoardSquare;
