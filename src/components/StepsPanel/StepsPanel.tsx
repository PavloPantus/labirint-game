import React, { useState, useEffect, useMemo } from 'react';
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
  newGameStarted: boolean,
  setNewGameStarted: (newGameStarted: boolean)=>void,
  setStartSquare: (startSquare: number|undefined)=>void,
  setEndSquare: (endSquare: number|undefined)=>void,
}

const StepsPanel: React.FC <StepsPanelProps> = (
  { gameStarted,
    setNewGameStarted,
    newGameStarted,
    setStartSquare,
    setEndSquare }
) => {
  const arrayOfSteps: Array<number | undefined> = useMemo(() => {
    const array: Array<number | undefined> = [];

    array.length = 10;
    array.fill(1);

    return array;
  }, []);

  type Istep = {
    step: string,
    stepNumber: number,
  }

  const [steps, setSteps] = useState<Istep[]>([]);
  const [nextStep, setNextStep] = useState< number|undefined >(undefined);


  useEffect(()=>{
    if(newGameStarted){
      setNextStep(undefined);
      setSteps([]);
      setStartSquare(undefined);
      setEndSquare(undefined);
      setNewGameStarted(false);
    }
  },[newGameStarted])

  useEffect(() => {
    /* function to ger random int */
    const getRandomIntInclusive = (min: number, max: number): number => {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min; // Включаючи мінімум та максимум
    };


    if (gameStarted && !newGameStarted && steps.length === 0) {


      /* get start square on game board */
      const startSquare = getRandomIntInclusive(1, 9);

      /* set start square on game board */
      setStartSquare(startSquare);

      const timerSteps = setInterval(() => {
        /* possible steps array */
        const possibleSteps: Array<string> = ['top', 'right', 'bottom', 'left'];

        /* array represents gameboard swqures */
        const arrayOFSquares: number[][] = [];

        for (let i = 1; i <= 9; i += 3) {
          const subArr = [];

          for (let a = i; a < i + 3; a += 1) {
            subArr.push(a);
          }
          arrayOFSquares.push(subArr);
        }

        /* function gets next step */
        const getNextStep = (previousSteps: Array<Istep>, startedSquare: number):Istep => {
          const getStepHelper = (includesValue: number):Istep => {
            /* check angles of sides on possible steps */

            /* left top angle */
            if (includesValue === 1) {
              return {
                step: possibleSteps.filter(
                  step => step !== 'top' && step !== 'left'
                )[getRandomIntInclusive(0, 1)],
                stepNumber: includesValue,
              };
            }

            /* top right angle */
            if (includesValue === 3) {
              return {
                step: possibleSteps.filter(
                  step => step !== 'top' && step !== 'right'
                )[getRandomIntInclusive(0, 1)],
                stepNumber: includesValue,
              };
            }

            /* bottom right angle */
            if (includesValue === 9) {
              return {
                step: possibleSteps.filter(
                  step => step !== 'bottom' && step !== 'right'
                )[getRandomIntInclusive(0, 1)],
                stepNumber: includesValue,
              };
            }

            /* bottom left angle */
            if (includesValue === 7) {
              return {
                step: possibleSteps.filter(
                  step => step !== 'bottom' && step !== 'left'
                )[getRandomIntInclusive(0, 1)],
                stepNumber: includesValue,
              };
            }

            /* check all sides */

            /* top side */
            if (arrayOFSquares[0].includes(includesValue)) {
              return {
                step: possibleSteps.filter(
                  step => step !== 'top'
                )[getRandomIntInclusive(0, 2)],
                stepNumber: includesValue,
              };
            }

            /* right side */
            if (arrayOFSquares.map(arr => arr[arr.length - 1]).includes(includesValue)) {
              return {
                step: possibleSteps.filter(
                  step => step !== 'right'
                )[getRandomIntInclusive(0, 2)],
                stepNumber: includesValue,
              };
            }

            /* bottom side */
            if (arrayOFSquares[arrayOFSquares.length - 1].includes(includesValue)) {
              return {
                step: possibleSteps.filter(
                  step => step !== 'bottom'
                )[getRandomIntInclusive(0, 2)],
                stepNumber: includesValue,
              };
            }

            /* left side */
            if (arrayOFSquares.map(arr => arr[0]).includes(includesValue)) {
              return {
                step: possibleSteps.filter(
                  step => step !== 'left'
                )[getRandomIntInclusive(0, 2)],
                stepNumber: includesValue,
              };
            }

            return {
              step: possibleSteps[getRandomIntInclusive(0, 3)],
              stepNumber: includesValue,
            };
          };

          if (previousSteps.length > 0) {
            const previousNumber = previousSteps[previousSteps.length - 1].stepNumber;

            const getNewNumber = (): number => {
              switch (previousSteps[previousSteps.length - 1].step) {
                case 'top': {
                  return previousNumber - 3;
                }

                case 'bottom': {
                  return previousNumber + 3;
                }

                case 'right': {
                  return previousNumber + 1;
                }

                case 'left': {
                  return previousNumber - 1;
                }
              }

              return 1;
            };

            return getStepHelper(getNewNumber());
          }

          return getStepHelper(startedSquare);
        };
        setSteps((steps) => {
          if (steps.length === 11) {
            clearInterval(timerSteps);
            setEndSquare(steps[steps.length - 1].stepNumber);
          }

          return [...steps, getNextStep(steps, startSquare)];
        });
      }, 1000);

      setTimeout(() => {
        let counter = 0;
        const timerNextStep = setInterval(() => {
          if (counter === 10) {
            clearInterval(timerNextStep);
          }
          setNextStep(counter);
          counter += 1;
        }, 1000);
      }, 1000);
    }
  }, [gameStarted, newGameStarted, steps]);

  return (
    <StyledStepPanel>
      {
        arrayOfSteps
          .map(
            (step, i) => (
              <GameStep
                key={i}
                nextStep={nextStep === i}
                stepDirection={steps[i] ? steps[i].step : ''}
              />
            )
          )
      }
    </StyledStepPanel>
  );
};

export default StepsPanel;
