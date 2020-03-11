import React, {useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import GameStep from '../Game-Step/Game-Step';

const StyledStepPanel = styled.div`
  display: grid;
  grid-template-rows: repeat(2, 45px);
  grid-template-columns: repeat(5, 45px);
  justify-content: center;
  grid-gap: 10px;
`;

type StepsPanelProps = {
  gameStarted: boolean,
  setGameStarted: (gameStarted: boolean)=>void,
}

const StepsPanel: React.FC <StepsPanelProps> = (
  {gameStarted,
    setGameStarted,
  }
  ) => {

  const arrayOfSteps: Array<number | undefined> = useMemo(() => {
    const array: Array<number | undefined> = [];

    array.length = 10;
    array.fill(1);

    return array;
  }, []);

  const [steps, setSteps] = useState<string[]>([]);
  const [nextStep, setNextStep] = useState< number|undefined >(undefined);
  useEffect(()=>{
    if(gameStarted){
      let timerSteps =  setInterval(()=>{
        if(steps.length ===  10){
          clearInterval(timerSteps);
        }

        const getNextStep = (previousSteps: Array<string>):string => {
           return 'top'
        }

        setSteps((steps)=>[...steps, getNextStep(steps)]);
      },1000);
      setTimeout(()=>{
        let counter = 0;
        let timerNextStep =  setInterval(()=>{
          if(counter ===  10){
            clearInterval(timerNextStep);
          }
          setNextStep(counter);
          counter += 1
        },1000)
      },1000)
    }
  },[gameStarted])

  return (
    <StyledStepPanel>
      {
        arrayOfSteps
          .map(
            (step, i) => <GameStep key={i} nextStep={nextStep===i} stepDirection={steps[i]} />
          )
      }
    </StyledStepPanel>
  );
};

export default StepsPanel;
