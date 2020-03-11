import React from 'react';
import styled from 'styled-components';

interface StyledGameStepProps {
  nextStep?: boolean,
  stepDirection?: string,
}

const StyledGameStep = styled.div < StyledGameStepProps > `
transition: all 0.5s;
  height: 100%;
  background-color: ${props => (props.nextStep ? 'red' : 'cadetblue')};
  background-image: url(
  ${
  (props) => {
    switch (props.stepDirection) {
      case 'top': return 'images/arrow-top.png';
      case 'right': return 'images/arrow-right.png';
      case 'bottom': return 'images/arrow-bottom.png';
      case 'left': return 'images/arrow-left.png';
      default: return '';
    }
  }
}
  );
  background-size: contain;
  
`;

type GameStepProps = {
  nextStep?: boolean,
  stepDirection?: string,
}

const GameStep: React.FC < GameStepProps > = (
  {
    nextStep,
    stepDirection,

  }
) => (
  <StyledGameStep nextStep={nextStep} stepDirection={stepDirection} />
);

export default GameStep;
