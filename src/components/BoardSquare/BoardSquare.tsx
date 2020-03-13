import React from 'react';
import styled from 'styled-components';

interface StyledBoardSquareProps {
  backgroundColor?: string,
}

const StyledBoardSquare = styled.div < StyledBoardSquareProps > `
  height: 100%;
  width: 100%;
  background-color: ${
  props => (props.backgroundColor
    ? props.backgroundColor : '#c595ff')
};
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid transparent;
  &:hover{
    border-color: black;
  }
`;

interface BoardSquareProps {
  innerValue?: string,
  backgroundColor?: string,
  onclickCallback: ()=>void,
}

const BoardSquare: React.FC <BoardSquareProps> = (
  {
    innerValue,
    backgroundColor,
    onclickCallback,
  }
) => (
  <StyledBoardSquare
    onClick={onclickCallback}
    backgroundColor={backgroundColor}
  >
    {innerValue}
  </StyledBoardSquare>
);

export default BoardSquare;
