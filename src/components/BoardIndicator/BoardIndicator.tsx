import React from 'react';
import styled from 'styled-components';

interface StyledBoardIndicatorProps {
  height?: string,
}

const StyledBoardIndicator = styled.div < StyledBoardIndicatorProps > `
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${props => props.height || '40px'};
  background-color: aqua;
`;

type BoardIndicatorProps = {
  indicateOn: number | string,
  height?: string,
}

const BoardIndicator: React.FC < BoardIndicatorProps > = (
  { indicateOn,
    height }
) => (
  <StyledBoardIndicator height={height}>
    {indicateOn}
  </StyledBoardIndicator>
);

export default BoardIndicator;
